@echo off
setlocal
set "PROJECT_ROOT=%~dp0"

echo ===============================================================================
echo   Online Food ^& Delivery: Event Food Management System
echo   SOA Project Review-1 Unified All-in-One Server Launcher
echo   KL Deemed to be University - Department of CSE
echo   Team: Y Durga Prasad Reddy (2420030281) ^& Toram Charam (2420030653)
echo ===============================================================================
echo.
echo [*] Starting Unified Microservices ^& Frontend Server on Port 3000...
echo.

:: Start Node server in a new window or background
start "EventFood Unified SOA Server" cmd /k "cd /d \"%PROJECT_ROOT%\" && node server.js"

:: Wait 2 seconds for server startup
ping -n 3 127.0.0.1 >nul

:: Launch in native frameless desktop app window or default browser
set "APP_URL=http://localhost:3000"

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="%APP_URL%" --window-size=1366,850
    exit /b 0
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="%APP_URL%" --window-size=1366,850
    exit /b 0
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="%APP_URL%" --window-size=1366,850
    exit /b 0
)

start "" "%APP_URL%"
exit /b 0
