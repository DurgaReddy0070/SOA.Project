@echo off
setlocal
set "PROJECT_ROOT=%~dp0"
set "MVN_CMD=%PROJECT_ROOT%.tools\maven\bin\mvn.cmd"

echo ===============================================================================
echo   Online Food ^& Delivery: Event Food Management System
echo   SOA Project Review-1 Microservices Ecosystem Launcher
echo   KL Deemed to be University - Department of CSE Bowrampet Campus
echo   Team: Y Durga Prasad Reddy (2420030281) ^& Toram Charam (2420030653)
echo ===============================================================================
echo.

echo [1/8] Starting Eureka Service Registry (Port 8761)...
start "1. EUREKA-SERVER [8761]" cmd /k "cd /d \"%PROJECT_ROOT%eureka-server\" && call \"%MVN_CMD%\" spring-boot:run"
ping -n 11 127.0.0.1 >nul

echo [2/8] Starting API Gateway (Port 8080)...
start "2. API-GATEWAY [8080]" cmd /k "cd /d \"%PROJECT_ROOT%api-gateway\" && call \"%MVN_CMD%\" spring-boot:run"
ping -n 6 127.0.0.1 >nul

echo [3/8] Starting Auth ^& RBAC Service (Port 8081)...
start "3. AUTH-SERVICE [8081]" cmd /k "cd /d \"%PROJECT_ROOT%auth-service\" && call \"%MVN_CMD%\" spring-boot:run"

echo [4/8] Starting Event Management Service (Port 8082)...
start "4. EVENT-SERVICE [8082]" cmd /k "cd /d \"%PROJECT_ROOT%event-service\" && call \"%MVN_CMD%\" spring-boot:run"

echo [5/8] Starting Vendor ^& Menu Service (Port 8083)...
start "5. VENDOR-SERVICE [8083]" cmd /k "cd /d \"%PROJECT_ROOT%vendor-service\" && call \"%MVN_CMD%\" spring-boot:run"

echo [6/8] Starting Bulk Order Logistics Service (Port 8084)...
start "6. ORDER-SERVICE [8084]" cmd /k "cd /d \"%PROJECT_ROOT%order-service\" && call \"%MVN_CMD%\" spring-boot:run"

echo [7/8] Starting Payment ^& Notification Service (Port 8085)...
start "7. PAYMENT-SERVICE [8085]" cmd /k "cd /d \"%PROJECT_ROOT%payment-service\" && call \"%MVN_CMD%\" spring-boot:run"

echo [8/8] Starting React Web Frontend (Port 3000)...
start "8. FRONTEND-WEB [3000]" cmd /k "cd /d \"%PROJECT_ROOT%frontend\" && call npm.cmd run dev -- --host 0.0.0.0"

echo.
echo ===============================================================================
echo   All 7 Microservices and Web Frontend initiated successfully!
echo   Web Application:   http://localhost:3000  or  http://127.0.0.1:3000
echo   Eureka Dashboard:  http://localhost:8761
echo   API Gateway:       http://localhost:8080
echo ===============================================================================
pause

