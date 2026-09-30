---
name: wintop-gpt-bridge
description: Cầu nối tự động hóa Antigravity với ChatGPT qua Chrome DevTools Protocol (Port 9222). Hỗ trợ điều khiển gửi prompt kịch bản, lắng nghe sinh ảnh DALL-E 3, tự động tải và lưu ảnh về outputs/anh_da_tao/ theo chuẩn phân cảnh, cập nhật scenes_manifest.json và làm mới Storyboard Dashboard.
---

# Wintop GPT Bridge Skill

Skill này cung cấp cơ chế điều phối tự động hóa hai chiều giữa **Antigravity Engine** và **ChatGPT (DALL-E 3 / GPT-4o)**, giải quyết bài toán tự động tạo ảnh theo kịch bản và tải lưu trữ ảnh tập trung vào thư mục dự án cục bộ.

---

## 1. Kiến Trúc Cầu Nối (Bridge Architecture)

```
[Antigravity Agent] 
        │ (Chrome DevTools Protocol - Port 9222)
        ▼
[Google Chrome Tab: ChatGPT / Custom GPT]
        │ (Gửi Cinematic Prompt từng cảnh)
        ▼
[OpenAI DALL-E 3 Render Engine]
        │ (Sinh ảnh chất lượng cao <= 90s)
        ▼
[Agent trích xuất URL ảnh gốc & Tải tự động]
        │
        ▼
[Lưu trữ: outputs/anh_da_tao/scene_XX_slug.png]
        │
        ▼
[Cập nhật: outputs/anh_da_tao/scenes_manifest.json]
        │
        ▼
[Làm mới: wintop_storyboard_dashboard.html]
```

---

## 2. Quy Trình Vận Hành Từng Bước

### Bước 1: Khởi động Chrome Cổng Debug
Người dùng hoặc Agent chạy file:
```bash
launch_chrome_debug.bat
```
Lệnh này mở trình duyệt Chrome với cổng kết nối CDP `9222` và thư mục dữ liệu riêng, giữ nguyên phiên đăng nhập tài khoản ChatGPT của người dùng mà không bị Cloudflare/CAPTCHA chặn.

### Bước 2: Nạp Cấu Hình Cho Custom GPT Trên Web
- Mở ChatGPT $\rightarrow$ vào phần **Configure Custom GPT**.
- Dán toàn bộ nội dung từ tệp tham chiếu [gpt_instructions.md](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/wintop-gpt-bridge/references/gpt_instructions.md) vào ô **Instructions**.
- Bật tính năng **DALL-E 3 Image Generation**.

### Bước 3: Điều Khiển Sinh & Tải Ảnh Tự Động
Khi kịch bản đã qua trạm duyệt **Human Gate**:
1. Agent gửi prompt phân cảnh tương ứng vào ô chat của GPT.
2. Lắng nghe thẻ `<img>` hoàn tất (thời gian chờ tối đa 90 giây).
3. Chạy script thu thập ảnh và ghi nhận siêu dữ liệu:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\.agents\skills\wintop-gpt-bridge\scripts\gpt_collector.ps1 -Action test -SceneId 1 -SceneTitle "Tan ca muon dem ram" -Prompt "Cinematic shot..." -SafeZone "Right-Third"
   ```
4. Ảnh được tự động tải về thư mục `outputs/anh_da_tao/` với định dạng tên chuẩn: `scene_01_tan_ca_muon_dem_ram.png`.
5. Tệp nhật ký `scenes_manifest.json` được cập nhật tức thì.
6. Trang HTML [wintop_storyboard_dashboard.html](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/wintop_storyboard_dashboard.html) tự động làm mới để hiển thị ảnh mới tạo.

---

## 3. Cấu Trúc Siêu Dữ Liệu (Manifest Schema)

Tệp `outputs/anh_da_tao/scenes_manifest.json` lưu giữ đầy đủ thông tin truy vết:
```json
{
  "campaign": "Chiến Dịch Trung Thu Wintop V3",
  "updated_at": "2026-09-19 11:50:00",
  "total_scenes": 3,
  "scenes": [
    {
      "id": 1,
      "title": "Scene 01: Tan ca muộn đêm rằm",
      "prompt": "Cinematic shot of a tired Vietnamese female factory worker...",
      "file_name": "scene_01_tan_ca_muon_dem_ram.png",
      "file_path": "outputs/anh_da_tao/scene_01_tan_ca_muon_dem_ram.png",
      "file_size_kb": 170.5,
      "safe_zone": "Right-Third",
      "audit_status": "PASSED",
      "source": "ChatGPT DALL-E 3",
      "downloaded_at": "2026-09-19 11:50:00"
    }
  ]
}
```

---

## 4. Danh Mục Tài Nguyên
- [gpt_instructions.md](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/wintop-gpt-bridge/references/gpt_instructions.md): Bộ chỉ dẫn cấu hình Custom GPT.
- [gpt_collector.ps1](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/wintop-gpt-bridge/scripts/gpt_collector.ps1): Script điều phối tải ảnh và cập nhật manifest.
- [launch_chrome_debug.bat](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/launch_chrome_debug.bat): File batch mở Chrome debug cổng 9222.
