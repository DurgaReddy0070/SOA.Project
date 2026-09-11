@echo off
set "PROJECT_ROOT=%~dp0"
set "PORTABLE_MVN=%PROJECT_ROOT%.tools\maven\bin\mvn.cmd"

if exist "%PORTABLE_MVN%" (
    call "%PORTABLE_MVN%" %*
) else (
    mvn %*
)
