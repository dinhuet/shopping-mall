@echo off
title Run Node.js Project
echo ---------------------------------------------
echo 🚀 Khởi động dự án Node.js
echo ---------------------------------------------
echo.
echo Chọn hành động:
echo [1] Cài đặt dependencies (npm install)
echo [2] Chạy dự án (npm start)
echo [3] Định dạng code (npm run beautiful)
echo [4] Thoát
echo.

:MENU
set /p choice=Nhập lựa chọn của bạn (1/2/3/4): 

if "%choice%"=="1" (
    echo Installing dependencies...
    call npm install
    echo Cài đặt xong!
    goto MENU
)

if "%choice%"=="2" (
    echo Đang khởi động server với Nodemon...
    call npm start
    goto END
)

if "%choice%"=="3" (
    echo Đang định dạng mã nguồn bằng Prettier...
    call npm run beautiful
    echo Định dạng xong!
    goto MENU
)

if "%choice%"=="4" (
    echo Đã thoát.
    goto END
)

echo Lựa chọn không hợp lệ. Vui lòng thử lại.
goto MENU

:END
pause
