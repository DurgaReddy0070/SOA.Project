@echo off
setlocal
set "PROJECT_ROOT=%~dp0"
set "PATH=%PROJECT_ROOT%.tools\maven\bin;%PATH%"

echo ===============================================================================
echo   Building Event Food Management System (All Microservices + Frontend)
echo ===============================================================================
echo.

echo [1/2] Building Spring Boot Microservices with Maven...
call "%PROJECT_ROOT%mvnw.cmd" clean package -DskipTests
if errorlevel 1 (
    echo [ERROR] Backend build failed.
    pause
    exit /b 1
)

echo.
echo [2/2] Building Frontend Web Application with npm...
cd /d "%PROJECT_ROOT%frontend"
call npm.cmd install
call npm.cmd run build
if errorlevel 1 (
    echo [ERROR] Frontend build failed.
    pause
    exit /b 1
)

echo.
echo ===============================================================================
echo   Build Successful! All Microservice JARs and Frontend bundle generated.
echo ===============================================================================
pause
