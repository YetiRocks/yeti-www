# Yeti Installer for Windows
# Usage: irm https://yetirocks.com/install.ps1 | iex
#   or:  & { $v="v0.5.0"; irm https://yetirocks.com/install.ps1 | iex }
$ErrorActionPreference = "Stop"

$Bucket = "https://yeti-releases.us-east-1.linodeobjects.com"
$InstallDir = "$env:LOCALAPPDATA\yeti\bin"

# Detect architecture
$Arch = switch ($env:PROCESSOR_ARCHITECTURE) {
    "AMD64"   { "x86_64" }
    "ARM64"   { "aarch64" }
    default   { Write-Error "Unsupported architecture: $env:PROCESSOR_ARCHITECTURE"; exit 1 }
}
$Target = "$Arch-pc-windows-msvc"

# Resolve version from latest/checksums.txt (filenames embed the version)
if ($v) { $Version = $v } else {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $Checksums = Invoke-WebRequest "$Bucket/latest/checksums.txt" -UseBasicParsing
    $Match = [regex]::Match($Checksums.Content, 'yeti-(v[0-9][^\s-]*)')
    if (-not $Match.Success) {
        Write-Error "Could not determine latest version from $Bucket/latest/checksums.txt"
        exit 1
    }
    $Version = $Match.Groups[1].Value
}

$TmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ("yeti-install-" + [System.IO.Path]::GetRandomFileName())
try {
    Write-Host "Installing Yeti $Version for $Target..."

    New-Item -ItemType Directory -Path $TmpDir -Force | Out-Null

    $BaseName = "yeti-$Version-$Target.tar.gz"
    $Url = "$Bucket/$Version/$BaseName"
    $ArchivePath = Join-Path $TmpDir $BaseName

    Write-Host "Downloading..."
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $Url -OutFile $ArchivePath -UseBasicParsing

    # Verify checksum
    Write-Host "Verifying checksum..."
    $ChecksumUrl = "$Bucket/$Version/checksums.txt"
    $ChecksumFile = Join-Path $TmpDir "checksums.txt"
    Invoke-WebRequest -Uri $ChecksumUrl -OutFile $ChecksumFile -UseBasicParsing

    $Expected = (Get-Content $ChecksumFile | Where-Object { $_ -match [regex]::Escape($BaseName) }) -replace '\s+.*$', ''
    if (-not $Expected) {
        Write-Error "No checksum found for $BaseName"
        exit 1
    }
    $Actual = (Get-FileHash -Path $ArchivePath -Algorithm SHA256).Hash.ToLower()
    if ($Actual -ne $Expected) {
        Write-Error "Checksum mismatch: expected $Expected, got $Actual"
        exit 1
    }

    # Extract with Windows' built-in tar (Windows 10 1803+)
    tar -xzf $ArchivePath -C $TmpDir
    if ($LASTEXITCODE -ne 0) {
        Write-Error "tar extraction failed"
        exit 1
    }

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
    Write-Host "Starting Yeti..."
    & (Join-Path $InstallDir "yeti.exe")
} finally {
    if (Test-Path $TmpDir) { Remove-Item $TmpDir -Recurse -Force -ErrorAction SilentlyContinue }
}
