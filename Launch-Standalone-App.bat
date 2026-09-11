@echo off
setlocal
set "PROJECT_ROOT=%~dp0"
set "HTML_FILE=%PROJECT_ROOT%index.html"

:: Open index.html in Native Frameless Desktop App Mode
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="file:///%HTML_FILE:\=/%" --window-size=1366,850
    exit /b 0
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="file:///%HTML_FILE:\=/%" --window-size=1366,850
    exit /b 0
)

where msedge >nul 2>&1
if not errorlevel 1 (
    start msedge --app="file:///%HTML_FILE:\=/%" --window-size=1366,850
    exit /b 0
)

where chrome >nul 2>&1
if not errorlevel 1 (
    start chrome --app="file:///%HTML_FILE:\=/%" --window-size=1366,850
    exit /b 0
)

start "" "%HTML_FILE%"
