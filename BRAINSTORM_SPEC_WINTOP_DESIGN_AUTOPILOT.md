---
type: brainstorm
feature: wintop-ai-design-autopilot-gpt
status: approved
updated: 2026-09-19
---

# HỆ THỐNG TỰ ĐỘNG HÓA QUY TRÌNH THIẾT KẾ WINTOP AI — BRAINSTORM SPECIFICATION

## 1. Idea Seed (Ý tưởng Gốc)
> "Kết hợp Antigravity với GPT để tự động hóa toàn diện quy trình thiết kế ảnh: tiếp nhận ảnh mẫu (Character, Product, Mascot) + đề bài, tự động bóc tách kịch bản phân cảnh chuẩn prompt điện ảnh, tạm dừng phê duyệt kịch bản (Human Checkpoint), điều khiển trình duyệt mở GPT sinh ảnh theo phân cảnh, tự động tải và lưu trữ ảnh vào thư mục dự án cục bộ (`outputs/anh_da_tao/`), liên kết xuất bản trang Storyboard Dashboard tổng quan và liên tục tự học hỏi nâng cấp tri thức nghiệp vụ."

---

## 2. Context & Why Now (Bối cảnh & Tính cấp thiết)
- **Bối cảnh hiện tại:** Team thiết kế Wintop (sữa Colostrum Gain & Wintop Baby) phải sản xuất thủ công mất từ 2 - 4 tiếng cho mỗi ấn phẩm Key Visual (tìm bối cảnh, ghép packshot, căn chỉnh ánh sáng). Khi triển khai chuỗi phân cảnh kịch bản dài, nhân vật thường xuyên bị lệch mặt (mất Face ID).
- **Tính cấp thiết (Why Now):** Các chiến dịch truyền thông cao điểm (Trung Thu, Tết, khuyến mãi) đòi hỏi sản xuất nhanh hàng chục ấn phẩm đa tỷ lệ (`1:1`, `9:16`, `16:9`) để chạy đa kênh Facebook, TikTok, YouTube. Nếu không tự động hóa, chi phí thuê ngoài và thời gian sản xuất sẽ làm trễ toàn bộ tiến độ chiến dịch.

---

## 3. User Types (Đối tượng Sử dụng & Phân Quyền)

| Nhóm Người dùng | Trách nhiệm chính trong luồng | Quyền hạn hệ thống | Nỗi đau cốt lõi (Pain Point) |
|---|---|---|---|
| **Creative Director / Art Director** | Định hình phong cách nghệ thuật, duyệt kịch bản phân cảnh, chốt xuất bản | Duyệt/Sửa kịch bản (Scene Stack), duyệt Safe Zone, đóng dấu xuất bản | Mất thời gian kiểm tra từng ảnh xem có che logo hay lệch màu thương hiệu không |
| **Visual Designer / AI Operator** | Nạp đề bài, nạp 3 slot ảnh mẫu, vận hành công cụ sinh ảnh, kiểm định lỗi | Nạp liệu, chạy công cụ điều khiển trình duyệt, sửa prompt, lưu ảnh | Tốn hàng giờ lặp đi lặp lại thao tác copy prompt sang web và tải từng file ảnh về đổi tên |
| **Marketing Lead / Media Buyer** | Tiếp nhận ảnh thành phẩm để triển khai chạy Ads đa kênh | Chỉ xem (View-only) trang Storyboard Dashboard, tải ảnh và file PSD | Chờ đợi ảnh quá lâu, nhận ảnh sai kích thước hoặc không đúng Safe Zone của kênh TikTok/Reels |

---

## 4. Capabilities Breakdown (Phân loại Mức độ Ưu tiên)

### P0 — Must Have (Sống còn trong phiên bản đầu)
- **F-01**: Tiếp nhận đề bài + 3 Slot dữ liệu mẫu (Character, Product lon Wintop, Mascot Hươu siêu nhân).
- **F-02**: Bóc tách kịch bản thành danh sách phân cảnh (Scene Stacks) chuẩn Prompt điện ảnh tiếng Anh.
- **F-03**: Trạm dừng phê duyệt kịch bản (Human Checkpoint) bắt buộc trước khi tạo ảnh.
- **F-04**: Điều khiển trình duyệt mở ChatGPT/Skill, gửi prompt tuần tự và lắng nghe trạng thái hoàn tất.
- **F-05**: Tự động tải ảnh độ phân giải gốc từ ChatGPT và lưu vào thư mục `outputs/anh_da_tao/` với tên chuẩn hóa.
- **F-06**: Xuất bản trang HTML Storyboard Dashboard trực quan hiển thị ảnh render, audit Safe Zone và prompt.

### P1 — Should Have (Nên có ở bản cập nhật tiếp theo)
- **F-07**: Tự động tách 4 lớp layer PSD (Background, Nhân vật, Sản phẩm, Text/Badge) bằng AI.
- **F-08**: Tích hợp AI Upscaler nâng nét ảnh lên chuẩn 4K/8K.
- **F-09**: Feedback Loop tự động cập nhật tri thức mới vào `learnings.md` và `brand_rules.json`.

### P2 — Nice to Have (Tương lai mở rộng)
- **F-10**: Tự động sinh video chuyển động (AI Video Generator: Veo / Sora) từ các phân cảnh Key Visual đã chốt.
- **F-11**: Tích hợp API tự động đẩy ảnh lên chiến dịch Facebook Ads và TikTok Ads Manager.

---

## 5. Core Flows (Luồng đi Chuẩn Happy Path)

### 5.1 Luồng 4 Bước Sản Xuất Ảnh Tự Động Khép Kín

```
[Designer nạp Brief & 3 Slot Ảnh Mẫu]
                 │
                 ▼
[Agent Bóc Tách Kịch Bản & Sinh Scene Stacks]
                 │
                 ▼
      [HUMAN CHECKPOINT DUYỆT] ◄───(Chỉnh sửa kịch bản nếu cần)
                 │ (Đã phê duyệt)
                 ▼
[Mở Trình Duyệt Kết Nối Tab ChatGPT / Skill]
                 │
         ┌───────┴───────┐
         ▼ (Tuần tự từng cảnh)
   [Gửi Prompt vào Chat GPT]
         │
   [Chờ GPT Sinh Ảnh Xong (<= 90s)]
         │
   [Tự Động Tải & Lưu: scene_XX_slug.png]
         │
   [Ghi Nhận Metadata vào scenes_manifest.json]
         └───────┬───────┘
                 │ (Đã hoàn tất N/N cảnh)
                 ▼
[Xuất Bản Storyboard Dashboard (HTML + Markdown)]
                 │
                 ▼
[Kích Hoạt Feedback Loop Tự Nâng Cấp Nghiệp Vụ]
```

1. **Bước 1 (Ingestion)**: Designer chuẩn bị đề bài chiến dịch và thả 3 ảnh mẫu vào thư mục `ảnh mẫu/` (Mẹ công nhân, Lon Wintop Colostrum Gain, Mascot Hươu).
2. **Bước 2 (Storyboard Synthesis)**: Agent đọc dữ liệu, bóc tách kịch bản thành N phân cảnh có cấu trúc cinematographic prompt và tọa độ Safe Zone 1/3.
3. **Bước 3 (Human Checkpoint)**: Agent xuất trình bảng phân cảnh. Creative Director xem xét, chỉnh sửa câu chữ nếu cần, rồi xác nhận "Duyệt".
4. **Bước 4 (Execution & Packaging)**: Hệ thống kích hoạt bộ điều khiển trình duyệt kết nối với ChatGPT, gửi prompt từng cảnh, tải ảnh lưu về `outputs/anh_da_tao/` và cập nhật trang Dashboard.

---

## 6. System Behavior Deep Dive (Hành vi Hệ thống Chuyên sâu)

### 6.1 Decision Points (Các Điểm Quyết định Rẽ Nhánh)

| Mã ID | Vị trí luồng | Điều kiện kiểm tra | YES (Nhánh chấp thuận) | NO (Nhánh xử lý ngoại lệ) |
|---|---|---|---|---|
| **DP-1** | Giai đoạn Ingestion | Đã có đủ 3 slot nguyên liệu mẫu (Ảnh nhân vật, Lon sữa, Mascot)? | Chuyển sang bóc tách kịch bản phân cảnh | Bật cảnh báo nhắc Designer bổ sung slot còn thiếu hoặc dùng ảnh mặc định trong kho brand |
| **DP-2** | Checkpoint kịch bản | Creative Lead bấm xác nhận "Duyệt kịch bản"? | Chuyển sang Chế độ Thiết kế (Mở trình duyệt GPT) | Tiếp nhận yêu cầu chỉnh sửa prompt/phân cảnh cho đến khi được duyệt |
| **DP-3** | Sinh ảnh trên GPT | Ảnh sinh xong trong thời gian cho phép (<= 90s)? | Tải ảnh về lưu vào `outputs/anh_da_tao/`, chuyển cảnh tiếp theo | Kích hoạt cơ chế Smart Retry (thử lại 1 lần) |
| **DP-4** | Sau Smart Retry | Thử lại cảnh lỗi thành công? | Tải ảnh và tiếp tục tiến trình | Đánh dấu cảnh là `FAILED / PENDING RETRY` và chạy tiếp cảnh kế tiếp, không dừng tiến trình |

### 6.2 Scenario Matrix (Ma trận Kịch bản Đa Trạng thái)

| Trạng thái Ban đầu | Sự kiện Kích hoạt | Quy tắc Nghiệp vụ | Hành động Hệ thống | Trạng thái Mới & Kết quả |
|---|---|---|---|---|
| `DRAFT_SCRIPT` | Người dùng gửi brief | Kịch bản phải được chia nhỏ thành các phân cảnh độc lập | Bóc tách Scene Stacks, gán tỷ lệ và Safe Zone 1/3 | `WAITING_APPROVAL` (Hiển thị bảng phân cảnh) |
| `WAITING_APPROVAL` | Người dùng bấm Duyệt | Không được sinh ảnh nếu chưa duyệt | Mở trình duyệt, kết nối session ChatGPT | `GENERATING_IMAGES` (Bắt đầu gửi Scene 1) |
| `GENERATING_IMAGES` | Tải xong ảnh cảnh N | Tên file phải theo quy chuẩn `scene_{id}_{slug}.png` | Lưu file vào thư mục, cập nhật `scenes_manifest.json` | `GENERATING_IMAGES` (Chuyển sang cảnh N+1) |
| `GENERATING_IMAGES` | Hoàn tất cảnh cuối cùng | 100% cảnh đã qua xử lý | Chạy script xuất Storyboard Dashboard HTML | `COMPLETED` (Bật thông báo hoàn tất kèm link) |

### 6.3 State Transitions (Vòng đời Chuyển đổi Trạng thái Phân cảnh)

```
[DRAFT] ──(Bóc tách)──> [PENDING_REVIEW] ──(Duyệt)──> [IN_QUEUE]
                                                          │
                                                          ▼
                                                    [GENERATING]
                                                    ┌─────┴─────┐
                                      (Thành công)  │           │ (Timeout / Lỗi)
                                                    ▼           ▼
                                                 [PASSED]    [RETRYING]
                                                                ┌───┴───┐
                                                  (Thành công)  │       │ (Vẫn lỗi)
                                                                ▼       ▼
                                                             [PASSED] [FAILED]
```

### 6.4 Interrupted Transactions (Xử lý Giao dịch Bị Gián đoạn)

| Tình huống rủi ro | Dữ liệu còn lại trên máy | Cơ chế Khôi phục (Resume) | Cơ chế Dọn dẹp (Cleanup) |
|---|---|---|---|
| Người dùng đóng trình duyệt khi mới tải được 5/14 ảnh | 5 file ảnh đã tải trong `outputs/anh_da_tao/` và manifest tạm | Khi chạy lại, hệ thống đọc `scenes_manifest.json`, bỏ qua 5 cảnh đã có và chỉ chạy tiếp từ cảnh số 6 | Xóa các file tải dở dang (`.tmp` hoặc 0 bytes) nếu có |
| ChatGPT báo chạm hạn mức tin nhắn (Rate Limit) | Toàn bộ ảnh đã tạo trước đó được bảo toàn | Hệ thống dừng an toàn, ghi nhận cảnh bị dừng và tạo file lệnh tiếp tục riêng | Giữ nguyên manifest, thông báo thời gian mở lại phiên |
| Mạng chập chờn rớt gói tin giữa chừng | Ảnh đang tải dở | Thử tải lại URL ảnh tối đa 3 lần với khoảng cách 5s | Hủy file lỗi nếu không tải được trọn vẹn |

---

## 7. Validation, Limits & Wording (Ràng buộc & Câu chữ Hiển thị)

### 7.1 Validation Rules (Quy tắc Kiểm tra Dữ liệu)

| Trường dữ liệu | Quy tắc bắt buộc | Hành vi khi vi phạm |
|---|---|---|
| `slot_product` | File PNG trong suốt, rõ nét logo Wintop Colostrum Gain | Báo lỗi nếu tải nhầm file không phải PNG tách nền |
| `prompt_cinematic` | Bắt buộc chứa đủ 5 thành tố: Subject, Environment, Brand Asset, Camera/Light, Quality | Tự động bổ sung các từ khóa chất lượng thiếu hụt |
| `safe_zone` | Bắt buộc chọn một trong các vùng: `1/3 Right`, `1/3 Bottom-Right`, `1/3 Bottom` | Mặc định chọn `1/3 Right` nếu người dùng không chỉ định |

### 7.2 Limits & Quotas (Định mức Số liệu Chính xác)

| Tham số nghiệp vụ | Định mức cụ thể | Hành vi khi vượt ngưỡng |
|---|---|---|
| Thời gian chờ sinh mỗi ảnh (Timeout) | **Tối đa 90 giây / ảnh** | Hết 90s kích hoạt Smart Retry 1 lần |
| Số lần thử lại tối đa (Max Retries) | **1 lần duy nhất** | Vẫn lỗi thì gắn cờ `FAILED` và chuyển cảnh tiếp theo |
| Quy mô phân cảnh trong 1 đợt chạy | **Từ 1 đến 20 phân cảnh** | Cảnh báo chia làm 2 đợt nếu kịch bản > 20 cảnh |
| Dung lượng file ảnh thành phẩm | **1 MB - 10 MB** (chuẩn 4K) | Cảnh báo kiểm tra lại nếu file < 200 KB (ảnh lỗi) |
| Quy chuẩn đặt tên file | `scene_{id:02d}_{slug}.png` | Tự động chuẩn hóa dấu tiếng Việt thành slug không dấu |

### 7.3 Wording Samples (Mẫu Thông báo Chuẩn Xác Từng Chữ)

- **Thông báo Bắt đầu:**
  > *"🚀 Khởi động phiên thiết kế tự động cho chiến dịch: [Tên chiến dịch]. Đang kết nối trình duyệt tới ChatGPT..."*
- **Thông báo Tiến độ từng cảnh:**
  > *"⏳ Đang gửi Phân cảnh [X]/[N] vào GPT... Đã tạo xong và lưu trữ thành công [Tên file] ([Dung lượng] MB)."*
- **Thông báo Cảnh báo Timeout:**
  > *"⚠️ Phân cảnh [X]/[N] bị quá thời gian phản hồi (>90s). Đang tự động thử lại lần 1..."*
- **Thông báo Bỏ qua tiếp tục:**
  > *"⚠️ Phân cảnh [X]/[N] không thể hoàn tất sau 2 lần thử. Đã đánh dấu tạm hoãn để tiếp tục Phân cảnh [X+1]!"*
- **Thông báo Hoàn tất 100%:**
  > *"🎉 CHÚC MỪNG! Đã hoàn tất tạo và lưu trữ [N]/[N] phân cảnh thành công tại `outputs/anh_da_tao/`! Bảng Storyboard Dashboard đã sẵn sàng tại [Đường dẫn Dashboard]."*

---

## 8. Assumptions (Giả định Nghiệp vụ)
- Người dùng đã có tài khoản ChatGPT đã đăng nhập sẵn trên trình duyệt Chrome để không cần xác thực lại.
- Các tài nguyên sản phẩm Wintop và Mascot được lưu trữ với chất lượng tốt, không bị méo tỷ lệ.
- Đường truyền mạng internet ổn định phục vụ tải ảnh dung lượng lớn từ máy chủ OpenAI.

---

## 9. Business Risks (Rủi ro Kinh doanh & Biện pháp Phòng ngừa)

| Rủi ro Nghiệp vụ | Mức độ | Hậu quả Kinh doanh | Biện pháp Phòng ngừa Đã Nhúng Vào Skill |
|---|:---:|---|---|
| **Biến dạng logo & nhãn lon Wintop** | Cao | Sai lệch nhận diện thương hiệu trên thị trường | Nạp quy tắc Inpainting Safe Zone và áp dụng bước hậu kiểm (Quality Audit) trước khi xuất bản |
| **Vi phạm Content Policy của ChatGPT** | Trung bình | Bị dừng phiên giữa chừng | Bộ prompt builder tự động lọc các từ nhạy cảm trước khi gửi vào chat |
| **Mất Face ID nhân vật mẹ & bé** | Cao | Quảng cáo bị giả tạo, người xem không tin tưởng | Luôn đính kèm mô tả chi tiết đặc điểm nhân trắc học và ảnh tham chiếu ở mỗi prompt |
| **Cháy hạn mức tin nhắn GPT** | Trung bình | Gián đoạn tiến độ sản xuất | Cơ chế Resume Session lưu vết trạng thái giúp tiếp tục chạy ngay khi tài khoản hồi phục |

---

## 10. Success Criteria (Tiêu chí Đo lường Thành công)
- **Tốc độ sản xuất**: Giảm từ 4 tiếng/ảnh xuống **dưới 60 giây/ảnh** (Tiết kiệm > 85% thời gian làm việc).
- **Chuẩn hóa nhận diện**: **100%** hình ảnh sinh ra tuân thủ đúng vùng an toàn Safe Zone 1/3.
- **Tính nhất quán nhân vật**: Đạt độ tương đồng khuôn mặt (Face Similarity) **>= 95%** xuyên suốt chuỗi cảnh.
- **Năng suất nghiệm thu**: Thời gian trình chiếu, duyệt kịch bản và bàn giao ảnh cho Media Buyer giảm **70%**.

---

## 11. Open Questions (Câu hỏi Mở để Nâng Cấp Tương Lai)
- [ ] **OQ-1**: Có cần tích hợp công cụ tự động gửi email/thông báo Telegram cho Art Director ngay khi Dashboard hoàn thành không?
- [ ] **OQ-2**: Phiên bản tiếp theo có nên hỗ trợ kết nối trực tiếp với API Google Veo 3 để tạo video 5 giây cho từng cảnh không?

---

## 12. Next Steps (Các Bước Kế Tiếp)
1. Kích hoạt bộ điều khiển tự động hóa trình duyệt để chạy thử nghiệm với kịch bản mẫu Trung Thu Wintop V3.
2. Tải và lưu ảnh về thư mục `outputs/anh_da_tao/` và cập nhật trang Dashboard thực tế.
3. Kích hoạt kỹ năng `/prd-architect` nếu muốn nâng cấp tài liệu này thành Software PRD Enterprise hoàn chỉnh.
