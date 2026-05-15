#!/bin/sh
# Yeti Installer for macOS / Linux
# Usage: curl -fsSL https://yetirocks.com/install.sh | sh
#   or:  curl -fsSL https://yetirocks.com/install.sh | sh -s -- v0.5.0
set -e

BUCKET="https://yeti-releases.us-east-1.linodeobjects.com"
VERSION="${1:-}"

# Cleanup on exit
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

echo "Installing Yeti..."

# Detect platform
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
case "$ARCH" in
  x86_64) ARCH="x86_64" ;;
  aarch64|arm64) ARCH="aarch64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

case "$OS" in
  darwin) PLATFORM="apple-darwin" ;;
  linux) PLATFORM="unknown-linux-gnu" ;;
  *) echo "Unsupported OS: $OS"; exit 1 ;;
esac

TARGET="${ARCH}-${PLATFORM}"

# Resolve version from latest/checksums.txt (filenames embed the version)
if [ -z "$VERSION" ]; then
  VERSION=$(curl --proto =https --tlsv1.2 -fsSL "${BUCKET}/latest/checksums.txt" \
    | grep -m1 -oE 'yeti-v[0-9][^[:space:]-]*' | sed 's/^yeti-//')
fi

if [ -z "$VERSION" ]; then
  echo "Error: could not determine latest version"; exit 1
fi

BASENAME="yeti-${VERSION}-${TARGET}.tar.gz"
URL="${BUCKET}/${VERSION}/${BASENAME}"
CHECKSUM_URL="${BUCKET}/${VERSION}/checksums.txt"

echo "Downloading yeti ${VERSION} for ${TARGET}..."
curl --proto =https --tlsv1.2 -fsSL "$URL" -o "$TMP/$BASENAME"

# Verify checksum
echo "Verifying checksum..."
curl --proto =https --tlsv1.2 -fsSL "$CHECKSUM_URL" -o "$TMP/checksums.txt"

EXPECTED=$(grep "$BASENAME" "$TMP/checksums.txt" | awk '{print $1}')
if [ -z "$EXPECTED" ]; then
  echo "Error: no checksum found for $BASENAME"; exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  ACTUAL=$(sha256sum "$TMP/$BASENAME" | awk '{print $1}')
elif command -v shasum >/dev/null 2>&1; then
  ACTUAL=$(shasum -a 256 "$TMP/$BASENAME" | awk '{print $1}')
else
  echo "Warning: no sha256sum or shasum found, skipping verification"
  ACTUAL="$EXPECTED"
fi

if [ "$ACTUAL" != "$EXPECTED" ]; then
  echo "Error: checksum mismatch"
  echo "  expected: $EXPECTED"
  echo "  actual:   $ACTUAL"
  exit 1
fi

tar xzf "$TMP/$BASENAME" -C "$TMP"

# Install — prefer user-local, fall back to system-wide
INSTALL_DIR="$HOME/.local/bin"
USE_SUDO=""
if [ -d "$INSTALL_DIR" ] && echo "$PATH" | grep -q "$INSTALL_DIR"; then
  : # use ~/.local/bin
elif [ -w "/usr/local/bin" ]; then
  INSTALL_DIR="/usr/local/bin"
else
  INSTALL_DIR="/usr/local/bin"
  USE_SUDO="sudo"
fi

echo "Installing to ${INSTALL_DIR}..."
mkdir -p "$INSTALL_DIR" 2>/dev/null || $USE_SUDO mkdir -p "$INSTALL_DIR"
$USE_SUDO mv "$TMP/yeti" "$INSTALL_DIR/yeti"
$USE_SUDO chmod +x "$INSTALL_DIR/yeti"

echo "Yeti ${VERSION} installed successfully!"
echo "Starting Yeti..."
"$INSTALL_DIR/yeti"
