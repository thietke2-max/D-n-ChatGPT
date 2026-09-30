# HƯỚNG DẪN ĐIỀU PHỐI TỰ ĐỘNG - WINTOP AI WORKSPACE

Tệp quy tắc này luôn có hiệu lực cho toàn bộ Workspace **Tạo ảnh tự động**.

## 1. Danh Sách Kỹ Năng Đã Cài Đặt (Active Workspace Skills)
Hệ thống được trang bị đầy đủ bộ 5 kỹ năng chuyên sâu:
- 👉 **`brainstorm`** (`.agents/skills/brainstorm/SKILL.md`): Phỏng vấn sâu 7 nhóm nghiệp vụ (Deep Interview), bóc tách ý tưởng và chuẩn hóa logic nghiệp vụ chuẩn IT Business Analyst.
- 👉 **`prd-architect`** (`.agents/skills/prd-architect/SKILL.md`): Thiết kế PRD Enterprise chuẩn Silicon Valley, kết hợp phỏng vấn sâu và sinh báo cáo HTML trực quan.
- 👉 **`archify`** (`.agents/skills/archify/SKILL.md`): Thiết kế và xuất bản sơ đồ kiến trúc, workflow, sequence diagrams dạng HTML/SVG tương tác cao cấp.
- 👉 **`wintop-design-autopilot`** (`.agents/skills/wintop-design-autopilot/SKILL.md`): Tự động hóa toàn diện quy trình thiết kế Wintop AI từ ảnh mẫu (Character, Product, Mascot) đến xuất bản ảnh và Dashboard.
- 👉 **`wintop-gpt-bridge`** (`.agents/skills/wintop-gpt-bridge/SKILL.md`): Cầu nối tự động hóa Antigravity với ChatGPT (Chrome CDP Port 9222), tải ảnh tự động về `outputs/anh_da_tao/`, cập nhật `scenes_manifest.json` và đồng bộ Dashboard.

## 2. Kích hoạt Kỹ năng Tự động (Auto-Triggered Skill)
- Khi người dùng gửi ảnh mẫu, yêu cầu thiết kế, lên ý tưởng chiến dịch, hoặc bóc tách kịch bản tạo ảnh cho Wintop, Agent **bắt buộc tự động kích hoạt và áp dụng quy trình của Skill**:
  👉 **`wintop-design-autopilot`**.
- Khi người dùng yêu cầu brainstorm, phân tích nghiệp vụ, làm rõ ý tưởng:
  👉 Kích hoạt quy trình phỏng vấn sâu của **`brainstorm`**.
- Khi người dùng yêu cầu lập tài liệu PRD hoặc vẽ sơ đồ kiến trúc hệ thống:
  👉 Kích hoạt **`prd-architect`** hoặc **`archify`**.

## 3. Quy chuẩn Bắt buộc (Hard Rules)
- **Quy tắc Safe Zone**: Sản phẩm và Mascot Wintop luôn nằm ở vùng an toàn 1/3 (bên phải hoặc góc dưới), không che mặt nhân vật.
- **Quy tắc Bảng màu**: Ưu tiên sắc Xanh dương `#00529B` và Vàng kim `#F5A623`.
- **Trạm dừng Phê duyệt (Human Checkpoint)**: Tuyệt đối không sinh ảnh hàng loạt nếu chưa trình bày bảng phân cảnh (Scene Stack) và nhận được sự đồng ý từ người dùng.
- **Dashboard Kép**: Khi hoàn tất, luôn xuất file HTML Storyboard Dashboard và lập báo cáo Markdown Artifact.
