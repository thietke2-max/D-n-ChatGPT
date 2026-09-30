@echo off
chcp 65001 > nul
echo ===================================================================
echo [Wintop AI] Khởi động Google Chrome với cổng Debugging 9222...
echo LƯU Ý: Vui lòng đóng tất cả các cửa sổ Chrome đang mở trước khi chạy.
echo ===================================================================

set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% (
    set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)
if not exist %CHROME_PATH% (
    set CHROME_PATH="%LocalAppData%\Google\Chrome\Application\chrome.exe"
)

start "" %CHROME_PATH% --remote-debugging-port=9222 --user-data-dir="%LocalAppData%\Google\Chrome\User Data Debug" https://chatgpt.com

echo [Wintop AI] Đã mở Chrome thành công! Cổng CDP 9222 sẵn sàng kết nối.
echo Bạn hãy đăng nhập ChatGPT trên cửa sổ này để Antigravity tự động điều khiển.
pause
