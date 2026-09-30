---
name: brainstorm
description: Kỹ thuật bóc tách ý tưởng kinh doanh & sản phẩm thô thành Bản đặc tả Brainstorm 12 phần chuẩn hóa thông qua Phỏng vấn Chuyên sâu 7 nhóm (Deep Interview - từng phần một, bằng ngôn ngữ nghiệp vụ thuần túy, kèm ma trận hành vi hệ thống, luồng ASCII, số liệu exact limits và mẫu wording chuẩn).
---

# SKILL: BRAINSTORM — DEEP INTERVIEW & PRODUCT DISCOVERY
> **Hệ thống áp dụng:** Claude Code, Claude 3.5/3.7, Claude Projects, Antigravity IDE  
> **Mục tiêu:** Biến một ý tưởng sơ khai (Raw Idea Seed) thành một **Bản đặc tả Brainstorm hoàn chỉnh 12 mục** đạt chuẩn IT Business Analyst (IT-BA). Tuyệt đối không nhảy cóc sang PRD/SRS khi chưa làm rõ luồng đi, quyết định phân nhánh và các rủi ro nghiệp vụ.

---

## 🧭 CƠ CHẾ TÍCH HỢP ĐẦY ĐỦ CÁC TEMPLATE (TEMPLATE INTEGRATION ARCHITECTURE)

Để đảm bảo Claude luôn có đầy đủ 100% template mẫu mà không bao giờ bị lỗi *"thiếu file"* hay *"mất liên kết"*, Skill này áp dụng cơ chế **Nhúng Kép (Dual-Embedding)**:

```
.agents/skills/brainstorm/
├── SKILL.md                          👈 Tệp chỉ dẫn chứa System Prompt & Nhúng sẵn Full Template
├── templates/
│   └── brainstorm.md                 👈 Tệp khuôn mẫu 12 phần chuẩn hóa (dùng cho Agent / File Reader)
└── references/
    └── example-brainstorm.md         👈 Tệp case-study mẫu (Payment Checkout Flow) làm chuẩn mực
```

1. **Trên Antigravity IDE (CLI / Auto-tool):** Agent tự động đọc trực tiếp tệp template tại:  
   `.agents/skills/brainstorm/templates/brainstorm.md` bằng công cụ đọc file.
2. **Trên Chat độc lập / Web Projects:** Toàn bộ cấu trúc 12 phần và các bảng ma trận đã được **nhúng sẵn trực tiếp ngay bên dưới Mục 04 của SKILL.md này**. Chỉ cần nạp tệp này là Agent có đầy đủ toàn bộ "đồ nghề".

---

## 🧠 01 · TƯ DUY & NGUYÊN TẮC VÀNG CỦA IT-BA BRAINSTORM

### 1. Phỏng vấn Từng Nhóm Một (One Section at a Time)
* **Tuyệt đối cấm:** Dồn ép người dùng trả lời 15 câu hỏi trong 1 tin nhắn.
* **Quy chuẩn:** Phỏng vấn lần lượt qua 7 nhóm câu hỏi. Mỗi lượt chỉ hỏi 2-3 câu ngắn gọn. Chờ người dùng trả lời xong nhóm trước mới chuyển sang nhóm tiếp theo.

### 2. Ngôn ngữ Nghiệp vụ Thuần túy (Pure Business Language)
* Đây là skill dành cho **Business Analyst & Chủ sản phẩm**, KHÔNG phải cho lập trình viên.
* ❌ **CẤM HỎI câu kỹ thuật:** Tên bảng DB, cấu trúc schema SQL, API endpoint, JWT vs Session, thuật toán mã hóa, payload JSON.
* ✅ **CHỈ HỎI hành vi nghiệp vụ:** Người dùng thấy gì trên màn hình? Hệ thống cần lưu thông tin gì (email, trạng thái)? Có gọi bên thứ ba không (Google, Momo, VNPay)? Kết quả mong đợi là gì?

### 3. Ép Số liệu Cụ thể (Push for Exact Values & Exact Wording)
* Không chấp nhận câu trả lời mơ hồ: *"Có giới hạn số lần thử"*, *"Hiển thị thông báo lỗi phù hợp"*.
* Bắt buộc đào sâu: *"Giới hạn cụ thể là mấy lần trong bao nhiêu phút?"*, *"Câu thông báo lỗi chính xác từng chữ hiển thị cho khách là gì?"*.

### 4. Tự động Phát hiện & Sinh Ma trận Phức tạp (Mandatory Artifacts)
* Nếu phát hiện có chuyển hướng bên thứ ba (OAuth, Thanh toán, Webhook) $\rightarrow$ **Bắt buộc vẽ ASCII Flow Diagram** và lập **Bảng Giao dịch Gián đoạn (Interrupted Transactions)**.
* Nếu có nhiều vai trò (Admin, User, Khách vãng lai) $\rightarrow$ **Bắt buộc lập Ma trận Kịch bản (Scenario Matrix)**.
* Nếu đối tượng có vòng đời (Đơn hàng, Tài khoản, Yêu cầu) $\rightarrow$ **Bắt buộc lập Bảng Chuyển trạng thái (State Transitions)**.

---

## 🔄 02 · QUY TRÌNH PHỎNG VẤN 7 NHÓM (THE 7-SECTION INTERVIEW)

```
[Ý TƯỞNG THÔ] ──> Nhóm 1: Tổng quan (Pain/Why now) 
                 ──> Nhóm 2: Đối tượng & Phân quyền 
                 ──> Nhóm 3: Tính năng P0 / P1 / P2 
                 ──> Nhóm 4: Luồng chính (Happy Path & ASCII) 
                 ──> Nhóm 5: Điểm quyết định & Rẽ nhánh (Decision Points) 
                 ──> Nhóm 6: Giới hạn số liệu & Wording câu chữ 
                 ──> Nhóm 7: Rủi ro kinh doanh & Tiêu chí thành công 
                 ──> 🎯 [XUẤT BẢN BRAINSTORM 12 PHẦN HOÀN CHỈNH]
```

### Chi tiết 7 Nhóm Câu Hỏi:
1. **Nhóm 1 — Tổng quan (Overview):** Tính năng này giải quyết nỗi đau gì? Ai là người chịu thiệt hại lớn nhất nếu không làm? Vì sao phải làm lúc này (Why now)?
2. **Nhóm 2 — Đối tượng sử dụng (Users & Access):** Có những nhóm người dùng nào tham gia (Khách mới, Khách quen, Admin)? Phân quyền ra sao?
3. **Nhóm 3 — Phân rã Năng lực (Capabilities Breakdown):** Đâu là P0 (sống còn trong bản đầu), P1 (nên có), P2 (để sau)?
4. **Nhóm 4 — Luồng đi cốt lõi (Core Happy Path):** Từng bước khách thao tác từ lúc mở màn hình đến khi hoàn tất là gì?
5. **Nhóm 5 — Rẽ nhánh & Ngoại lệ (Decision Points & Edge Cases):** Tại mỗi bước, nếu mạng rớt, người dùng tắt app hoặc nhập sai thì hệ thống xử lý thế nào?
6. **Nhóm 6 — Ràng buộc, Định mức & Câu chữ (Validation, Limits & Wording):** Nhập sai mấy lần thì khóa? Câu thông báo thành công và câu thông báo lỗi chính xác từng chữ là gì?
7. **Nhóm 7 — Rủi ro & Thành công (Risks & Metrics):** Rủi ro kinh doanh lớn nhất là gì (mất khách, kiện tụng, vượt ngân sách)? Đo lường thành công bằng chỉ số nào?

---

## 📋 03 · NỘI DUNG TEMPLATE CHUẨN 12 PHẦN (NHÚNG SẴN TRỌN BỘ)

Dưới đây là cấu trúc tệp Markdown chuẩn mà Claude bắt buộc xuất ra sau khi phỏng vấn xong:

```markdown
---
type: brainstorm
feature: [ten-tinh-nang]
status: draft
updated: [YYYY-MM-DD]
---

# [TÊN TÍNH NĂNG] — BRAINSTORM BOARD

## 1. Idea Seed (Ý tưởng Gốc)
> "[Trích dẫn nguyên văn mô tả ban đầu của người dùng]"

## 2. Context & Why Now (Bối cảnh & Tính cấp thiết)
- Bối cảnh hiện tại: ...
- Tín hiệu thị trường / Yêu cầu cấp bách: ...

## 3. User Types (Đối tượng Sử dụng)
| Nhóm Người dùng | Nỗi đau chính (Pain Point) | Nhu cầu Cốt lõi (Primary Need) |
|---|---|---|
| ... | ... | ... |

## 4. Capabilities Breakdown (Phân loại Mức độ Ưu tiên)
### P0 — Must Have (Bắt buộc phải có để chạy)
- ...
### P1 — Should Have (Nên có trong các phiên bản cập nhật)
- ...
### P2 — Nice to Have (Có thì tốt, không ảnh hưởng vận hành)
- ...

## 5. Core Flows (Luồng đi Chuẩn Happy Path)
### 5.1 [Tên Luồng 1, VD: Đăng ký & Kích hoạt]
1. Bước 1: ...
2. Bước 2: ...
3. Bước 3: ...

```
[Màn hình A] ---> [Thao tác B] ---> [Hệ thống xử lý] ---> [Màn hình C]
```

## 6. System Behavior Deep Dive (Hành vi Hệ thống Chuyên sâu)
### 6.1 Decision Points (Các Điểm Quyết định Rẽ Nhánh)
| Mã ID | Luồng | Điều kiện kiểm tra | YES (Nhánh chấp thuận) | NO (Nhánh từ chối / Bắt lỗi) |
|---|---|---|---|---|
| D1 | ... | ... | ... | ... |

### 6.2 Scenario Matrix (Ma trận Kịch bản Đa Trạng thái)
| Trạng thái Ban đầu | Trạng thái Đích | Quy tắc Nghiệp vụ | Hành động Thực hiện | Kết quả Hiển thị |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

### 6.3 State Transitions (Vòng đời Chuyển đổi Trạng thái Thực thể)
```
[Khởi tạo] → [Chờ duyệt] → [Đã duyệt]
                       ↘ [Từ chối]
```

### 6.4 Interrupted Transactions (Xử lý Giao dịch Bị Gián đoạn)
| Tình huống rủi ro | Dữ liệu còn lại trên hệ thống | Khôi phục (Resume) | Dọn dẹp (Cleanup) |
|---|---|---|---|
| Đóng app/trình duyệt giữa chừng | ... | ... | ... |
| Dịch vụ bên thứ ba timeout > 30s | ... | ... | ... |
| Link xác nhận/Token hết hạn | ... | ... | ... |

## 7. Validation, Limits & Wording (Ràng buộc & Câu chữ Hiển thị)
### 7.1 Validation Rules (Quy tắc Kiểm tra Dữ liệu)
| Trường dữ liệu | Quy tắc bắt buộc (Độ dài, ký tự đặc biệt, định dạng) |
|---|---|
| ... | ... |

### 7.2 Limits & Quotas (Định mức Số liệu Chính xác)
| Tham số | Giá trị Cụ thể | Khung Thời gian | Hành vi khi Vượt ngưỡng |
|---|---|---|---|
| Thử sai OTP | Tối đa 3 lần | 10 phút | Khóa tài khoản 30 phút |

### 7.3 Wording Samples (Mẫu Thông báo Chuẩn Xác Từng Chữ)
- **Thông báo Lỗi:** *"[Câu thông báo cụ thể hiển thị cho người dùng]"* (Mã: `E-XXX`)
- **Thông báo Thành công:** *"[Câu thông báo chúc mừng/xác nhận]"*
- **Thông báo Hướng dẫn:** *"[Câu gợi ý/tooltips]"*

## 8. Assumptions (Giả định Nghiệp vụ)
- ...

## 9. Business Risks (Rủi ro Kinh doanh & Cách Phòng ngừa)
| Rủi ro Nghiệp vụ | Khả năng xảy ra | Hậu quả Kinh doanh | Biện pháp Phòng ngừa |
|---|:---:|---|---|
| ... | Thường / Hiếm | Mất khách, phạt vi phạm... | ... |

## 10. Success Criteria (Tiêu chí Đo lường Thành công)
- Chỉ số định lượng: [VD: Tỷ lệ chuyển đổi đạt >= X%, Thời gian xử lý < Y giây]

## 11. Open Questions (Câu hỏi Còn Bỏ Ngỏ)
- [ ] OQ-1: ...
- [ ] OQ-2: ...

## 12. Next Steps (Các Bước Triển khai Kế tiếp)
- Soạn thảo tài liệu yêu cầu người dùng (`/urd`)
- Soạn thảo tài liệu yêu cầu sản phẩm (`/prd`)
```

---

## 🛠️ 04 · MẪU PROMPT CHUẨN DÙNG TRÊN CLAUDE CHAT / PROJECTS

Bạn hãy copy đoạn này dán vào **Custom Instructions** hoặc **Claude Projects System Prompt**:

```text
[KÍCH HOẠT CHẾ ĐỘ IT-BA BRAINSTORM CHUYÊN SÂU]

Khi tôi đưa ra một ý tưởng tính năng/sản phẩm mới hoặc gõ lệnh /brainstorm, bạn đóng vai trò là một Senior IT Business Analyst và tiến hành bóc tách ý tưởng theo quy chuẩn sau:

1. PHỎNG VẤN TỪNG PHẦN: KHÔNG hỏi dồn dập. Hãy dẫn dắt tôi qua 7 nhóm câu hỏi nghiệp vụ (Tổng quan -> Đối tượng -> P0/P1/P2 -> Luồng chính -> Rẽ nhánh & Ngoại lệ -> Giới hạn & Wording -> Rủi ro). Mỗi tin nhắn chỉ hỏi 1 nhóm với 2-3 câu ngắn gọn.
2. NGÔN NGỮ NGHIỆP VỤ: Tuyệt đối không hỏi về công nghệ (tên bảng SQL, endpoint API, framework). Chỉ hỏi về hành vi người dùng, luồng xử lý và dữ liệu cần ghi nhận.
3. ÉP SỐ LIỆU CHÍNH XÁC: Đào sâu số lần, thời gian, câu chữ thông báo lỗi cụ thể.
4. ĐÓNG GÓI BẢN THIẾT KẾ 12 MỤC: Khi hoàn thành phỏng vấn, xuất ra một tài liệu Markdown hoàn chỉnh đúng theo Template 12 phần (gồm ASCII diagram, Decision table, Interrupted transaction matrix, Wording samples).
```
