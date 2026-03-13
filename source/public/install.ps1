# Yeti Installer for Windows
# Usage: irm https://yetirocks.com/install.ps1 | iex
#   or:  & { $v="v0.5.0"; irm https://yetirocks.com/install.ps1 | iex }
$ErrorActionPreference = "Stop"

$Repo = "yetirocks/yeti"
$InstallDir = "$env:LOCALAPPDATA\yeti\bin"

# Detect architecture
$Arch = switch ($env:PROCESSOR_ARCHITECTURE) {
    "AMD64"   { "x86_64" }
    "ARM64"   { "aarch64" }
    default   { Write-Error "Unsupported architecture: $env:PROCESSOR_ARCHITECTURE"; exit 1 }
}
$Target = "$Arch-pc-windows-msvc"

# Resolve version
if ($v) { $Version = $v } else {
    $Release = Invoke-RestMethod "https://api.github.com/repos/$Repo/releases/latest" -UseBasicParsing
    $Version = $Release.tag_name
}

$TmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ("yeti-install-" + [System.IO.Path]::GetRandomFileName())
try {
    Write-Host "Installing Yeti $Version for $Target..."

    New-Item -ItemType Directory -Path $TmpDir -Force | Out-Null

    $BaseName = "yeti-$Version-$Target.zip"
    $Url = "https://github.com/$Repo/releases/download/$Version/$BaseName"
    $ZipPath = Join-Path $TmpDir $BaseName

    Write-Host "Downloading..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $Url -OutFile $ZipPath -UseBasicParsing

    # Verify checksum
    Write-Host "Verifying checksum..."
    $ChecksumUrl = "https://github.com/$Repo/releases/download/$Version/checksums.txt"
    $ChecksumFile = Join-Path $TmpDir "checksums.txt"
    Invoke-WebRequest -Uri $ChecksumUrl -OutFile $ChecksumFile -UseBasicParsing

    $Expected = (Get-Content $ChecksumFile | Where-Object { $_ -match $BaseName }) -replace '\s+.*$', ''
    if (-not $Expected) {
        Write-Error "No checksum found for $BaseName"
        exit 1
    }
    $Actual = (Get-FileHash -Path $ZipPath -Algorithm SHA256).Hash.ToLower()
    if ($Actual -ne $Expected) {
        Write-Error "Checksum mismatch: expected $Expected, got $Actual"
        exit 1
    }

    Expand-Archive -Path $ZipPath -DestinationPath $TmpDir -Force

    # Install
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    Copy-Item (Join-Path $TmpDir "yeti.exe") $InstallDir -Force

    # Add to PATH if not already present
    $UserPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $PathEntries = $UserPath -split ";"
    if ($PathEntries -notcontains $InstallDir) {
        [Environment]::SetEnvironmentVariable("Path", "$UserPath;$InstallDir", "User")
        Write-Host "Added $InstallDir to PATH (restart your terminal)"
    }

    Write-Host "Yeti $Version installed successfully!"
    Write-Host "Run 'yeti init' to get started."
} finally {
    if (Test-Path $TmpDir) { Remove-Item $TmpDir -Recurse -Force -ErrorAction SilentlyContinue }
}
