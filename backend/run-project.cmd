@echo off
title Run Node.js Project
echo ---------------------------------------------
echo 🚀 Node.js Project Launcher
echo ---------------------------------------------
echo.
echo Choose an action:
echo [1] Install dependencies (npm install)
echo [2] Start the server (npm start)
echo [3] Format code with Prettier (npm run beautiful)
echo [4] Exit
echo.

:MENU
set /p choice=Enter your choice (1/2/3/4): 

if "%choice%"=="1" (
    echo Installing dependencies...
    call npm install
    echo Dependencies installed!
    goto MENU
)

if "%choice%"=="2" (
    echo Starting the server with Nodemon...
    call npm start
    goto END
)

if "%choice%"=="3" (
    echo Formatting code with Prettier...
    call npm run beautiful
    echo Code formatted!
    goto MENU
)

if "%choice%"=="4" (
    echo Exiting...
    goto END
)

echo Invalid choice. Please try again.
goto MENU

:END
pause
