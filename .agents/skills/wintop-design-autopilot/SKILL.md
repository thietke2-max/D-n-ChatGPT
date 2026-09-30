---
name: wintop-design-autopilot
description: Tự động hóa toàn diện quy trình thiết kế Wintop AI từ ảnh mẫu (Character, Product, Mascot) và yêu cầu đề bài. Tự động bóc tách kịch bản phân cảnh chuẩn Prompt điện ảnh, dừng phê duyệt kịch bản (Human-in-the-loop), chuyển sang chế độ thiết kế tạo ảnh Hybrid, xuất báo cáo Dashboard quy trình kép và liên tục tự học hỏi nâng cấp tri thức nghiệp vụ.
---

# Wintop Design Autopilot Skill

Skill này cung cấp quy trình vận hành tự động khép kín chuẩn hóa dành cho đội ngũ sáng tạo của **Wintop AI** (Thương hiệu sữa dinh dưỡng Wintop Colostrum Gain & Wintop Baby), biến các ý tưởng thô và ảnh nguyên liệu mẫu thành bộ Key Visual / Storyboard hoàn chỉnh và chuyên nghiệp.

---

## 1. Nguyên Tắc Cốt Lõi (Core Principles)

1. **Chuẩn hóa Thương hiệu Wintop**: Mọi hình ảnh sinh ra phải tuân thủ nghiêm ngặt nhận diện thương hiệu: màu chủ đạo Xanh dương `#00529B`, Vàng kim `#F5A623`, và quy tắc Safe Zone 1/3 (dành chỗ cho Lon sữa và Mascot Hươu siêu nhân mà không che mặt nhân vật chính).
2. **Quy trình 4 Giai đoạn Khép kín**:
   - **Giai đoạn 1: Tiếp nhận & Phân tích Đề bài** (Input Ingestion & Scene Synthesis)
   - **Giai đoạn 2: Trạm dừng Phê duyệt Kịch bản** (Human-in-the-loop Checkpoint)
   - **Giai đoạn 3: Chế độ Thiết kế & Tạo ảnh** (Design Engine - Hybrid Generation)
   - **Giai đoạn 4: Báo cáo Quy trình & Tự Nâng cấp** (Dashboard Reporting & Continuous Learning)

---

## 2. Quy Trình Vận Hành Chi Tiết (Standard Operating Procedure)

```
[Ảnh mẫu + Đề bài] 
        │
        ▼
[Phase 1: Phân tích & Bóc tách kịch bản] 
        │
        ▼
[Phase 2: Dừng xin phê duyệt kịch bản (Checkpoint)] ──(Chỉnh sửa)──┐
        │ (Đã duyệt)                                              │
        ▼                                                         ▼
[Phase 3: Chế độ Thiết kế (Tạo ảnh Hybrid)] ◄─────────────────────┘
        │
        ▼
[Phase 4: Báo cáo Storyboard kép & Feedback Loop tự nâng cấp]
```

### Phase 1: Tiếp nhận & Phân tích Đề bài (Ingestion & Synthesis)

Khi người dùng gửi ảnh mẫu hoặc đưa ra yêu cầu đề bài:
1. **Kiểm tra 3 Slot Nguyên liệu Mẫu**:
   - `Slot Character`: Nhận diện gương mặt, độ tuổi, cảm xúc (Mẹ công nhân, Bé Lan, Người bà...). Nếu người dùng đã có ảnh trong thư mục `ảnh mẫu/`, phân tích đặc điểm nhân vật để neo giữ Face ID.
   - `Slot Product`: Nhận diện sản phẩm Wintop (Lon Colostrum Gain 400g/800g, Vỉ sữa...).
   - `Slot Mascot`: Nhận diện hình dáng Mascot Hươu cao cổ siêu nhân Wintop.
2. **Bóc tách Kịch bản thành Chuỗi Phân cảnh (Scene Stack)**:
   - Chia kịch bản thành từng Scene cụ thể (Scene 01, Scene 02, ...).
   - Mỗi phân cảnh phải xác định rõ:
     - **Tiêu đề phân cảnh** (ví dụ: *Scene 01: Tan ca muộn đêm rằm*)
     - **Nhân vật xuất hiện & Hành động chính**
     - **Tỉ lệ khung hình (Aspect Ratio)**: `1:1` (Vuông social), `9:16` (Dọc TikTok/Reels), `16:9` (Ngang Cinematic).
     - **Vị trí Safe Zone**: Góc 1/3 bên phải hoặc 1/3 góc dưới để đặt Packshot sản phẩm.
     - **Prompt tiếng Anh điện ảnh (Cinematic Prompt)** theo cấu trúc chuẩn:
       `[Subject & Action] + [Environment & Mood] + [Brand Asset Placement] + [Camera Angle & Lighting] + [Style: photorealistic, 8k, 35mm f/1.8]`

---

### Phase 2: Trạm dừng Phê duyệt Kịch bản (Human Checkpoint)

> [!IMPORTANT]
> **BẮT BUỘC DỪNG LẠI TẠI ĐÂY**: Không được tự ý sinh ảnh hàng loạt khi kịch bản chưa được người dùng xác nhận.

1. Xuất trình bảng phân cảnh tổng quan cho người dùng:
   - Liệt kê bảng gồm: STT Scene, Tiêu đề, Tỉ lệ, Vị trí Safe Zone, Nội dung miêu tả tóm tắt.
2. Đưa ra câu hỏi xin phê duyệt rõ ràng:
   - *"Kịch bản và các phân cảnh đã được bóc tách theo đúng tinh thần Wintop. Bạn có muốn điều chỉnh chi tiết nào trước khi chuyển sang Chế độ Thiết kế Tạo ảnh không?"*
3. Tiếp thu mọi yêu cầu chỉnh sửa prompt/phân cảnh từ người dùng cho đến khi kịch bản được chốt 100%.

---

### Phase 3: Chế độ Thiết kế & Tạo Ảnh (Design Engine)

Sau khi kịch bản được chốt, chuyển hệ thống sang **Chế độ Thiết kế**:
1. **Tạo ảnh trực quan tức thì trong Antigravity**:
   - Sử dụng công cụ `generate_image` để tạo các ảnh Key Visual hoặc phân cảnh quan trọng tương ứng với prompt đã chốt.
   - Lưu ảnh vào thư mục Artifacts hoặc Workspace để người dùng có thể xem trước ngay.
2. **Kiểm tra Chất lượng & Đồng nhất (AI Quality & Brand Audit)**:
   - Kiểm tra giải phẫu (Anatomy): ngón tay, ánh mắt tự nhiên.
   - Kiểm tra tính hài hòa của ánh sáng giữa sản phẩm Wintop và môi trường (Rim Light, Contact Shadow).
   - Đảm bảo vùng Safe Zone 1/3 không che lấp khuôn mặt nhân vật.
3. **Đồng bộ Kịch bản sang Google Flow Pipeline**:
   - Đóng gói danh sách phân cảnh vào cấu trúc mảng JSON chuẩn tương thích với `wintop_google_flow_autopilot.js` để người dùng có thể kích hoạt chạy tự động trên trình duyệt nếu cần.

---

### Phase 4: Báo Cáo Tổng Quan Quy Trình & Tự Nâng Cấp (Reporting & Self-Upgrade)

1. **Báo cáo Storyboard Dashboard Kép**:
   - **Báo cáo Markdown Artifact**: Tạo artifact tổng hợp gồm tiến độ, bảng phân cảnh kèm link ảnh nhúng, điểm đánh giá Safe Zone và thông số prompt.
   - **Trang HTML Storyboard Dashboard**: Chạy script tiện ích:
     ```bash
     node .agents/skills/wintop-design-autopilot/scripts/generate_dashboard.js <data.json> <output_dashboard.html>
     ```
     để xuất bản trang HTML dashboard trực quan, sang trọng cho toàn bộ chiến dịch.
2. **Vòng lặp Tự Học hỏi & Tiến hóa (Feedback Loop)**:
   - Chủ động hỏi người dùng: *"Bạn có muốn tinh chỉnh hay lưu ý thêm quy tắc nghiệp vụ nào cho các lần tạo ảnh tiếp theo không?"*
   - Khi người dùng cung cấp góp ý (ví dụ: cách mô tả trang phục, tỷ lệ đặt lon sữa, từ khóa cấm kỵ):
     - Tự động ghi nhận bài học vào `.agents/skills/wintop-design-autopilot/references/learnings.md`.
     - Cập nhật quy tắc nhận diện vào `.agents/skills/wintop-design-autopilot/references/brand_rules.json` nếu có thay đổi về quy chuẩn thương hiệu.

---

## 3. Thư Mục Tài Nguyên Tham Khảo (References)

- **Quy chuẩn nhận diện Wintop**: [brand_rules.json](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/wintop-design-autopilot/references/brand_rules.json)
- **Nhật ký tri thức tiến hóa**: [learnings.md](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/wintop-design-autopilot/references/learnings.md)
- **Script xuất Dashboard**: [generate_dashboard.js](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/wintop-design-autopilot/scripts/generate_dashboard.js)
- **Userscript Google Flow**: [wintop_google_flow_autopilot.js](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/wintop_google_flow_autopilot.js)
