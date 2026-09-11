@echo off
setlocal
set "PROJECT_ROOT=%~dp0"

echo ===============================================================================
echo   Launching EventFood Management System - Desktop App Mode
echo ===============================================================================
echo.

:: 1. Ensure Frontend server is active
curl.exe -s -o NUL -w "%%{http_code}" http://localhost:3000 | findstr "200" >nul 2>&1
if errorlevel 1 (
    echo [*] Starting Frontend Server...
    start "EventFood Frontend" /min cmd /c "cd /d \"%PROJECT_ROOT%frontend\" && call npm.cmd run dev"
    echo [*] Initializing frontend...
    ping -n 5 127.0.0.1 >nul
)

:: 2. Launch in Native Frameless Desktop App Window Mode (Edge or Chrome)
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

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="%APP_URL%" --window-size=1366,850
    exit /b 0
)

:: Use PowerShell Start-Process as reliable fallback
powershell -Command "try { Start-Process msedge -ArgumentList '--app=%APP_URL%', '--window-size=1366,850' } catch { try { Start-Process chrome -ArgumentList '--app=%APP_URL%', '--window-size=1366,850' } catch { Start-Process '%APP_URL%' } }"
exit /b 0
