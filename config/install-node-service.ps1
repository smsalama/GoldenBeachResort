# Install Golden Beach Node server as a Windows Service (SolidCP fallback).
# Run in elevated PowerShell on the server.
#
# Prerequisite: download nssm from https://nssm.cc/ and place nssm.exe in PATH,
# or set $nssm below to the full path.

$ErrorActionPreference = "Stop"

$siteRoot = "C:\HostingSpaces\GoldenBeach\new.goldenbeachresort.net\wwwroot"
$serverDir = Join-Path $siteRoot "server"
$nodeExe = "C:\Program Files\nodejs\node.exe"
$serviceName = "GoldenBeachNode"
$nssm = "nssm"   # or "C:\Tools\nssm\nssm.exe"

if (-not (Test-Path $nodeExe)) { throw "Node not found at $nodeExe" }
if (-not (Test-Path (Join-Path $serverDir "server.js"))) { throw "server.js not found in $serverDir" }

& $nssm install $serviceName $nodeExe "server.js"
& $nssm set $serviceName AppDirectory $serverDir
& $nssm set $serviceName AppEnvironmentExtra "NODE_ENV=production" "PORT=3000"
& $nssm set $serviceName DisplayName "Golden Beach Resort Node"
& $nssm set $serviceName Description "GBR CMS API and static file server on port 3000"
& $nssm set $serviceName Start SERVICE_AUTO_START
& $nssm set $serviceName AppStdout (Join-Path $siteRoot "logs\node-service.log")
& $nssm set $serviceName AppStderr (Join-Path $siteRoot "logs\node-service-error.log")

Write-Host ""
Write-Host "Service installed. Next steps:"
Write-Host "  1. sc.exe start $serviceName"
Write-Host "  2. Test: http://127.0.0.1:3000/"
Write-Host "  3. Replace wwwroot\web.config with config\web.config.proxy"
Write-Host "  4. Enable ARR proxy in IIS (Server node -> Application Request Routing -> Enable proxy)"
