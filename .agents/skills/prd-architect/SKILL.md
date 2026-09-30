---
name: prd-architect
description: "Nhạc trưởng thiết kế PRD Enterprise chuyên nghiệp (Silicon Valley standard): Phỏng vấn sâu ý tưởng 7 nhóm nghiệp vụ (Deep Brainstorm), tự động phân tích tín hiệu logic để sinh các sơ đồ trực quan tương ứng (Use Case, Swimlane, Sequence, ERD, State Machine) và xuất bản song song cả tài liệu Markdown chuẩn Git lẫn bản báo cáo HTML Single-Page tuyệt đẹp."
---

# /prd-architect - Enterprise PRD & Visual System Designer

## Goal

Thiết kế tài liệu **Yêu Cầu Sản Phẩm Toàn Diện (Enterprise PRD)** đạt chuẩn Silicon Valley & Agile cho bất kỳ tính năng hoặc phân hệ phần mềm nào. Hợp nhất quy trình:
1. **Phỏng vấn sâu 7 nhóm nghiệp vụ tuần tự** (kế thừa từ `/brainstorm`).
2. **Tự động sinh bộ sơ đồ thị giác thông minh** dựa trên tín hiệu logic tính năng (kế thừa bộ 11 diagram skills: PlantUML Use Case, Swimlane, Sequence, ERD, State Machine).
3. **Xuất bản song song kép**: Bản đặc tả Markdown chuẩn Git (`.md`) kèm theo bản báo cáo HTML Single-Page cao cấp (`.html`) có mục lục động và giao diện in PDF trực tiếp cho Stakeholders / Ban Giám Đốc.

---

## Cách Gọi (Invocation)

- Kích hoạt bằng ngôn ngữ tự nhiên:
  - `"Thiết kế PRD cho tính năng thanh toán ví điện tử và tích điểm"`
  - `"Phân tích ý tưởng và lập PRD cho phân hệ đặt lịch hẹn bác sĩ"`
  - `"Làm PRD chuyên nghiệp cho [ý tưởng / tài liệu brief đính kèm]"`
- Kích hoạt bằng câu lệnh:
  - `/prd-architect "<mô tả ý tưởng thô>"`
  - `/prd-architect @<file-brief.md>`

---

## Nguyên Tắc Vàng (Golden Rules)

1. **Strict 7-Group Deep Dive (Hỏi tuần tự từng nhóm)**:
   - Đi lần lượt qua 7 nhóm nghiệp vụ. Tuyệt đối **KHÔNG** dồn dập 15-20 câu hỏi một lúc.
   - Chờ người dùng phản hồi từng nhóm rồi mới bước tiếp nhóm sau.
2. **IT-BA Framing (Chỉ dùng ngôn ngữ nghiệp vụ)**:
   - Phục vụ Product Manager & Business Analyst. Tuyệt đối **KHÔNG** hỏi câu hỏi mang tính code/kỹ thuật sâu (Không hỏi tên cột DB, tên endpoint API, framework hay thuật toán mã hóa).
   - Chỉ hỏi: *Hệ thống làm gì, lưu thông tin nghiệp vụ gì, phân quyền cho ai, kết quả người dùng nhìn thấy là gì*.
3. **No-Re-Ask Rule (Không hỏi lại điều đã biết)**:
   - Tự động trích xuất các dữ kiện đã có sẵn trong câu chat hoặc file đính kèm của người dùng; chỉ hỏi vào các khoảng trống nghiệp vụ còn thiếu (Gaps).
4. **Signal-Driven Smart Diagram (Sinh sơ đồ theo logic)**:
   - Luôn có: **Use Case Diagram** tổng quan phân hệ.
   - Nếu có từ 2 vai trò/hệ thống trở lên: Sinh **Activity Swimlane Diagram** phân làn trách nhiệm.
   - Nếu có API ngoài/Thanh toán/OAuth/Webhook: Bắt buộc sinh **Sequence Diagram** và bảng **Interrupted Transaction Matrix**.
   - Nếu quản lý dữ liệu/bảng: Sinh **ERD Data Model**.
   - Nếu thực thể có vòng đời (Đơn hàng, Vé, Giao dịch): Sinh **State Machine Diagram**.
5. **Approval Gate (Cổng kiểm duyệt L1)**:
   - Sau khi phỏng vấn xong 7 nhóm, agent bắt buộc dừng lại ở bước **Xem trước kế hoạch L1** (gồm: Feature slug, Tóm tắt phạm vi, Danh sách sơ đồ sẽ vẽ). Chỉ khi người dùng duyệt "Y" mới được ghi file.
6. **Dual-Format Publishing (Xuất bản kép)**:
   - Luôn tạo đồng thời: `docs/{feature}/prd/{feature}-prd.md` và chạy script biên dịch ra `docs/{feature}/prd/{feature}-prd.html`.

---

## Quy Trình 5 Giai Đoạn (Execution Phases)

### Giai Đoạn 1: Tiếp Nhận Ý Tưởng & Khởi Tạo Slug (Bootstrap)
1. Đọc ý tưởng từ văn bản người dùng nhập hoặc file đính kèm.
2. Tự động suy luận `feature-slug` (viết thường, phân cách bằng dấu gạch ngang, ví dụ: `e-wallet-payment`).
3. Khởi tạo cấu trúc thư mục làm việc:
   - `docs/{feature}/prd/`
   - `docs/{feature}/prd/assets/` (dành cho file ảnh sơ đồ SVG/PNG).

---

### Giai Đoạn 2: Phỏng Vấn Sâu 7 Nhóm Nghiệp Vụ (Strict 7-Group Deep Dive)
Hỏi lần lượt từng nhóm, mỗi lượt hỏi tập trung 2-3 câu hỏi cốt lõi bằng tiếng Việt:

#### Nhóm 1: Nhóm Người Dùng & Phân Quyền (Roles & Access)
- *Ai là người trực tiếp thao tác tính năng này? (Ví dụ: Khách hàng vãng lai, Thành viên VIP, Merchant, Quản trị viên/CSKH?)*
- *Mỗi vai trò có quyền hạn khác biệt gì đối với dữ liệu? (Ví dụ: Khách chỉ được xem và tạo; Admin được duyệt và hủy?)*

#### Nhóm 2: Phạm Vi Tính Năng & Phân Kỳ (P0 / P1 / P2 Scope)
- *Trong phiên bản đầu tiên ra mắt (P0 - MVP Core), đâu là những chức năng bắt buộc phải có để luồng hoạt động được?*
- *Những tính năng tiện ích nào (P1/P2) có thể dời sang giai đoạn tối ưu sau? Đâu là những điểm nằm ngoài phạm vi (Out of Scope)?*

#### Nhóm 3: Luồng Nghiệp Vụ Chuẩn (Core Happy Path Flow)
- *Hãy mô tả từng bước của một lượt sử dụng thành công trọn vẹn từ khi người dùng bắt đầu đến khi kết thúc.*
- *Mỗi bước hệ thống sẽ hiển thị những thông tin gì để dẫn dắt người dùng?*

#### Nhóm 4: Xử Lý Rẽ Nhánh & Tình Huống Ngoại Lệ (System Behavior & Edge Cases)
- *Các trường hợp thất bại hoặc từ chối có thể xảy ra là gì? (Ví dụ: Hết hàng, sai mật khẩu, số dư không đủ)*
- *Nếu người dùng rớt mạng giữa chừng hoặc dịch vụ bên thứ ba bị timeout, hệ thống sẽ lưu vết và xử lý hoàn trả/đối soát như thế nào?*

#### Nhóm 5: Ràng Buộc Dữ Liệu & Câu Chữ Thông Báo (Validation & Exact Wording)
- *Các giới hạn số liệu chính xác là gì? (Ví dụ: Hạn mức tối thiểu/tối đa 1 giao dịch, độ dài ký tự)*
- *Câu thông báo lỗi và thông báo thành công chính xác hiển thị trên màn hình nên được viết như thế nào?*

#### Nhóm 6: Giả Định & Rủi Ro Nghiệp Vụ (Assumptions & Risks)
- *Tính năng này dựa trên những giả định nghiệp vụ nào? (Ví dụ: Giả định 100% người dùng đã định danh tài khoản)*
- *Rủi ro vận hành hoặc gian lận lớn nhất có thể gặp phải là gì và phương án phòng ngừa (Mitigation) là gì?*

#### Nhóm 7: Chỉ Số Thành Công (Success Metrics & KPIs)
- *Chỉ số cốt lõi (North Star Metric) để đánh giá tính năng này thành công sau 30 ngày ra mắt là gì? (Ví dụ: Tỷ lệ hoàn tất thanh toán đạt ≥ 85%, giảm 40% cuộc gọi CSKH)*

---

### Giai Đoạn 3: Bộ Nhận Diện Tín Hiệu Sơ Đồ (Signal-Driven Diagram Strategy)
Dựa trên câu trả lời sau 7 nhóm, tự động tổng hợp danh sách các sơ đồ cần vẽ:

| Tín hiệu trong nghiệp vụ | Loại sơ đồ tự động kích hoạt | Định dạng & Engine | Vị trí lưu |
|---|---|---|---|
| **Mọi tính năng (Mặc định)** | Use Case Diagram | PlantUML (`.puml` -> `.svg`) | `assets/usecase-diagram.svg` |
| **Có ≥ 2 bên tham gia** | Activity Swimlane | PlantUML (`.puml` -> `.svg`) | `assets/activity-swimlane.svg` |
| **Có API / Webhook / Cổng ngoài** | Sequence Diagram | Mermaid `sequenceDiagram` | Nhúng trực tiếp Markdown |
| **Có bảng dữ liệu & khóa ngoại** | Entity-Relationship (ERD) | Mermaid `erDiagram` | Nhúng trực tiếp Markdown |
| **Thực thể có vòng đời chuyển trạng thái** | State Machine Diagram | Mermaid `stateDiagram-v2` | Nhúng trực tiếp Markdown |

---

### Giai Đoạn 4: Cổng Phê Duyệt L1 (L1 Approval Gate)
Dừng lại và hiển thị bảng kế hoạch cho người dùng:
```markdown
### Bản Xem Trước Kế Hoạch L1 (PRD Blueprint)
- **Feature Slug**: `{feature-slug}`
- **Tiêu đề PRD**: `{Feature Title}`
- **Phạm vi P0**: {Danh sách 3-5 tính năng lõi}
- **Bộ sơ đồ trực quan dự kiến sinh**:
  1. [x] Use Case Diagram (PlantUML)
  2. [x] Activity Swimlane Diagram (PlantUML)
  3. [x] Sequence Diagram API / Webhook (Mermaid)
  4. [x] ERD Data Model (Mermaid)
  5. [x] State Machine Vòng đời (Mermaid)
- **Các file xuất bản**:
  - `docs/{feature}/prd/{feature}-prd.md`
  - `docs/{feature}/prd/{feature}-prd.html`

👉 Bạn có đồng ý với kế hoạch này để tiến hành tạo tài liệu và sinh sơ đồ không? (Y / Sửa đổi)
```

---

### Giai Đoạn 5: Xuất Bản Kép & Hoàn Tất (Dual-Format Publishing)
Khi người dùng đồng ý:
1. **Sinh các sơ đồ trực quan (Diagrams)**:
   - Sử dụng kỹ năng [archify](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/archify/SKILL.md) hoặc nhúng mã Mermaid trực tiếp vào tài liệu PRD (Use Case, Swimlane, Sequence, ERD, State Machine).
2. **Sinh tài liệu Markdown PRD**:
   - Áp dụng cấu trúc chuẩn từ [templates/prd-template.md](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/.agents/skills/prd-architect/templates/prd-template.md).
   - Nhúng link ảnh `assets/*.svg` hoặc các khối mã Mermaid chuẩn vào tài liệu.
   - Ghi vào file `docs/{feature}/prd/{feature}-prd.md`.
3. **Biên dịch bản HTML Single-Page**:
   - Chạy script compiler Node.js sẵn có trong workspace:
     `node .agents/skills/prd-architect/scripts/build-prd-html.mjs --input docs/{feature}/prd/{feature}-prd.md`
   - Sinh ra file `docs/{feature}/prd/{feature}-prd.html` hoàn chỉnh.
4. **Báo cáo kết quả**:
   - Hiển thị tóm tắt, đường dẫn file Markdown và hướng dẫn mở file HTML trên trình duyệt hoặc in PDF.
