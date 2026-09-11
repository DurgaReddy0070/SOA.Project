# ===============================================================================
#   Online Food & Delivery: Event Food Management System
#   SOA Project Review-1 Microservices Ecosystem Launcher (PowerShell)
#   KL Deemed to be University - Department of CSE Bowrampet Campus
#   Team: Y Durga Prasad Reddy (2420030281) & Toram Charam (2420030653)
# ===============================================================================

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mvnCmd = "$rootDir\.tools\maven\bin\mvn.cmd"

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "  Launching Event Food Management System Microservices..." -ForegroundColor Yellow
Write-Host "===============================================================================" -ForegroundColor Cyan

# 1. Eureka Server
Write-Host "[1/8] Starting Eureka Service Registry (Port 8761)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\eureka-server'; & '$mvnCmd' spring-boot:run"
Start-Sleep -Seconds 10

# 2. API Gateway
Write-Host "[2/8] Starting API Gateway (Port 8080)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\api-gateway'; & '$mvnCmd' spring-boot:run"
Start-Sleep -Seconds 5

# 3. Auth Service
Write-Host "[3/8] Starting Auth Service (Port 8081)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\auth-service'; & '$mvnCmd' spring-boot:run"

# 4. Event Service
Write-Host "[4/8] Starting Event Service (Port 8082)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\event-service'; & '$mvnCmd' spring-boot:run"

# 5. Vendor Service
Write-Host "[5/8] Starting Vendor Service (Port 8083)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\vendor-service'; & '$mvnCmd' spring-boot:run"

# 6. Order Service
Write-Host "[6/8] Starting Order Service (Port 8084)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\order-service'; & '$mvnCmd' spring-boot:run"

# 7. Payment Service
Write-Host "[7/8] Starting Payment Service (Port 8085)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\payment-service'; & '$mvnCmd' spring-boot:run"

# 8. Frontend Web
Write-Host "[8/8] Starting Frontend Web App (Port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$rootDir\frontend'; cmd.exe /c npm.cmd run dev -- --host 0.0.0.0"

Write-Host ""
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "  All Microservices & Web Frontend Launched!" -ForegroundColor Yellow
Write-Host "  - Eureka Dashboard:  http://localhost:8761" -ForegroundColor White
Write-Host "  - API Gateway:       http://localhost:8080" -ForegroundColor White
Write-Host "  - Web App:           http://localhost:3000" -ForegroundColor White
Write-Host "===============================================================================" -ForegroundColor Cyan
