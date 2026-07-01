# Start Golden Beach Resort Node server (for web.config.proxy fallback).
# Run in an elevated or persistent session, or register with NSSM as a Windows service.
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..\wwwroot\server  # adjust if you copy this script elsewhere
$env:NODE_ENV = "production"
$env:PORT = "3000"
Write-Host "Starting GBR on http://127.0.0.1:3000 ..."
node server.js
