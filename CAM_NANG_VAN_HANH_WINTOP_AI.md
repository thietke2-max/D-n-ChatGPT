# CẨM NANG VẬN HÀNH TOÀN DIỆN: HỆ THỐNG TỰ ĐỘNG HÓA THIẾT KẾ WINTOP AI
## Master Operating Manual & Creative Production Runbook
> **Thương hiệu áp dụng**: Sữa dinh dưỡng Wintop (Colostrum Gain & Wintop Baby)  
> **Nền tảng tích hợp**: Antigravity IDE • OpenAI ChatGPT (DALL-E 3) • Google Flow  
> **Phiên bản tài liệu**: 2.0 Enterprise • **Ngày ban hành**: 19/09/2026  
> **Đơn vị ban hành**: Creative Production Lead & AI System Architecture  

---

## MỤC LỤC CẨM NANG

1. [Phần 1: Tổng Quan Kiến Trúc & Đội Ngũ 5 AI Agents](#phần-1-tổng-quan-kiến-trúc--đội-ngũ-5-ai-agents)
2. [Phần 2: Bộ Quy Chuẩn Thương Hiệu & Quy Tắc Bất Di Bất Dịch](#phần-2-bộ-quy-chuẩn-thương-hiệu--quy-tắc-bất-di-bất-dịch)
3. [Phần 3: Công Thức Soạn Thảo Prompt Điện Ảnh Chuẩn 5 Thành Tố](#phần-3-công-thức-soạn-thảo-prompt-điện-ảnh-chuẩn-5-thành-tố)
4. [Phần 4: Quy Trình Vận Hành 4 Chặng Khép Kín (SOP)](#phần-4-quy-trình-vận-hành-4-chặng-khép-kín-sop)
5. [Phần 5: Hướng Dẫn Điều Khiển Trình Duyệt Kết Nối ChatGPT](#phần-5-hướng-dẫn-điều-khiển-trình-duyệt-kết-nối-chatgpt)
6. [Phần 6: Quản Lý Kho Ảnh & Bảng Storyboard Dashboard](#phần-6-quản-lý-kho-ảnh--bảng-storyboard-dashboard)
7. [Phần 7: Sổ Tay Xử Lý Sự Cố (Troubleshooting & Edge Cases)](#phần-7-sổ-tay-xử-lý-sự-cố-troubleshooting--edge-cases)
8. [Phần 8: Bảng Tiêu Chuẩn Nghiệm Thu Chất Lượng Trước Khi Bàn Giao](#phần-8-bảng-tiêu-chuẩn-nghiệm-thu-chất-lượng-trước-khi-bàn-giao)

---

## PHẦN 1: TỔNG QUAN KIẾN TRÚC & ĐỘI NGŨ 5 AI AGENTS

Hệ thống vận hành theo cơ chế **Parallel Subagent Swarm** (Bầy tác nhân chuyên môn hóa chạy song song dưới quyền chỉ huy của Orchestrator):

```
                       ┌─────────────────────────────────────┐
                       │ 1. Master Flow Orchestrator (Tổng)  │
                       └──────────────────┬──────────────────┘
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
┌──────────────────┐             ┌──────────────────┐             ┌──────────────────┐
│ 2. Scene Prompt  │             │ 3. Human Gate &  │             │ 4. Browser GPT   │
│    Specialist    │             │    Brand Guard   │             │    Automation    │
└──────────────────┘             └──────────────────┘             └──────────────────┘
                                                                           │
                                                                           ▼
                                                                  ┌──────────────────┐
                                                                  │ 5. Packaging &   │
                                                                  │    Dashboard     │
                                                                  └──────────────────┘
```

1. **Master Flow Orchestrator (Wintop Director)**: Tiếp nhận Brief chiến dịch, khởi tạo mã phiên và điều phối đồ thị DAG.
2. **Scene Synthesis & Cinematic Prompt Agent**: Chuyên gia bóc tách kịch bản thành các ô phân cảnh (Scene Stacks), biên dịch ngôn ngữ kịch bản sang prompt điện ảnh tiếng Anh.
3. **Human Gate & Brand Consistency Guardian**: Người gác cổng thương hiệu, kiểm tra vị trí Safe Zone 1/3, giữ vững Face ID nhân vật và đón nhận quyết định phê duyệt của bạn tại trạm dừng đỏ.
4. **Browser GPT Automation Agent**: Điều khiển Chrome (cổng CDP 9222), nạp prompt vào ChatGPT, chờ render và trích xuất link tải ảnh gốc về máy.
5. **Packaging & Storyboard Dashboard Agent**: Lưu tệp vào `outputs/anh_da_tao/`, cập nhật `scenes_manifest.json`, làm mới trang HTML Storyboard Dashboard và kích hoạt Feedback Loop tự học hỏi.

---

## PHẦN 2: BỘ QUY CHUẨN THƯƠNG HIỆU & QUY TẮC BẤT DI BẤT DỊCH

Để mọi hình ảnh sinh ra đạt chuẩn nhận diện của Sữa dinh dưỡng Wintop, Designer và AI Operator bắt buộc phải tuân thủ 4 quy chuẩn sau:

### 1. Quy tắc Vùng An Toàn (Safe Zone 1/3)
* **Vị trí bắt buộc**: Lon sữa Wintop Colostrum Gain và Mascot Hươu siêu nhân **BẮT BUỘC** nằm ở **1/3 góc bên phải** hoặc **1/3 góc dưới** của bức ảnh.
* **Quy tắc cấm kỵ**: Tuyệt đối không để sản phẩm che khuất khuôn mặt, ánh mắt hoặc nụ cười của nhân vật chính.
* **Tỷ lệ nhân trắc học**: Kích thước lon sữa 400g/800g phải đúng tỷ lệ thực tế khi đặt trên bàn ăn hoặc trong vòng tay nhân vật, không được quá to bất thường hoặc quá bé như cốc nước.

### 2. Hệ Màu Nhận Diện Thương Hiệu
* **Màu Xanh Dương Cốt Lõi (`#00529B`)**: Thể hiện sự tin cậy, chuẩn khoa học và nền tảng dinh dưỡng vững chắc.
* **Màu Vàng Kim Điểm Nhấn (`#F5A623`)**: Tượng trưng cho dưỡng chất Sữa non Mỹ (Colostrum), ánh đèn Trung Thu và sự ấm cúng gia đình.
* **Màu Nền Canvas (`#121621`)**: Tôn vinh độ tương phản và chiều sâu của hình ảnh Key Visual.

### 3. Quy chuẩn 3 Slot Tài Nguyên Mẫu (Reference Asset Dropzone)
* `Slot Character`: Chân dung/toàn thân nhân vật mẫu (Mẹ công nhân, Bé Lan 5 tuổi, Người bà) để AI neo giữ cấu trúc xương mặt.
* `Slot Product`: File PNG trong suốt của Lon Wintop Colostrum Gain 400g/800g hoặc Vỉ sữa pha sẵn.
* `Slot Mascot`: File PNG trong suốt của Linh vật Hươu cao cổ siêu nhân mặc áo choàng đỏ.

---

## PHẦN 3: CÔNG THỨC SOẠN THẢO PROMPT ĐIỆN ẢNH CHUẨN 5 THÀNH TỐ

Mọi phân cảnh đưa vào hệ thống tạo ảnh đều phải được cấu trúc theo công thức chuẩn:

```
[Chủ thể & Hành động] + [Bối cảnh & Cảm xúc] + [Vị trí Sản phẩm Safe Zone] + [Góc máy & Ánh sáng] + [Phong cách & Chất lượng]
```

### Bảng Thành Tố Tiêu Chuẩn:
1. **Subject & Action**: Miêu tả rõ độ tuổi, quốc tịch, trang phục và tư thế (ví dụ: *A tired 30-year-old Vietnamese female factory worker in a dark blue factory uniform, tenderly looking at her 5-year-old daughter*).
2. **Environment & Mood**: Bối cảnh sinh hoạt chân thực (ví dụ: *A modest northern Vietnamese village rental room at night, sentimental and warm atmosphere*).
3. **Brand Asset Integration**: Vị trí đặt lon sữa (ví dụ: *On the small wooden table in the right-third safe zone, place a sharp, clearly visible can of Wintop Colostrum Gain with authentic reflections*).
4. **Camera Angle & Lighting**: Thông số ống kính máy ảnh (ví dụ: *Shot on 35mm f/1.8 lens, medium shot, soft warm tungsten 2700K room lamp, delicate moonlight rim light on her hair*).
5. **Quality Modifiers**: Bộ điều chỉnh chất lượng (ví dụ: *photorealistic, 8k resolution, cinematic color grading, award-winning cinematography, ultra-detailed textures*).

---

## PHẦN 4: QUY TRÌNH VẬN HÀNH 4 CHẶNG KHÉP KÍN (SOP)

```
[Chặng 1: Nạp Input] ──> [Chặng 2: Human Gate (TÔ ĐỎ)] ──> [Chặng 3: Browser GPT] ──> [Chặng 4: Xuất Bản]
  - Đề bài kịch bản         - Soi bảng phân cảnh             - Mở Chrome 9222            - Lưu outputs/
  - 3 Slot ảnh mẫu          - Chỉnh sửa prompt               - GPT render ảnh            - Manifest JSON
  - Bóc tách Scene Stack    - BẤM DUYỆT (Approved)           - Tự động tải về            - Storyboard HTML
```

* **Chặng 1 (Ingestion & Scene Synthesis)**: Designer thả kịch bản Word/Excel và 3 ảnh mẫu vào thư mục `ảnh mẫu/`. Agent tự động phân tích và sinh danh sách phân cảnh.
* **Chặng 2 (Human Approval Gate)**: **TRẠM DỪNG BẮT BUỘC**. Bảng phân cảnh được xuất trình. Creative Director kiểm tra kịch bản và vị trí Safe Zone. Chỉ khi bấm **Duyệt**, hệ thống mới mở cổng sang Chặng 3.
* **Chặng 3 (Browser GPT Automation)**: Script tự động kết nối trình duyệt Chrome, gửi từng prompt vào ChatGPT, chờ tối đa 90 giây/ảnh và tự động tải ảnh gốc về máy.
* **Chặng 4 (Packaging & Dashboard)**: Đổi tên file theo chuẩn `scene_{id:02d}_{slug}.png`, ghi nhận metadata vào `scenes_manifest.json` và làm mới trang Dashboard trực quan.

---

## PHẦN 5: HƯỚNG DẪN ĐIỀU KHIỂN TRÌNH DUYỆT KẾT NỐI CHATGPT

Để Antigravity tự động điều khiển ChatGPT mà không bị Cloudflare hay yêu cầu xác thực OTP chặn, hãy sử dụng cơ chế **Chrome Remote Debugging**:

1. **Bước 1**: Đóng tất cả các cửa sổ Google Chrome đang mở trên máy tính.
2. **Bước 2**: Nhấp đúp vào tệp:
   ```bash
   launch_chrome_debug.bat
   ```
   Trình duyệt Chrome sẽ tự động mở lên với cổng kết nối CDP `9222`.
3. **Bước 3**: Đăng nhập tài khoản ChatGPT của bạn trên cửa sổ này.
4. **Bước 4**: Mở công cụ điều khiển trong Antigravity để hệ thống tự động gửi prompt và tải ảnh về thư mục dự án!

---

## PHẦN 6: QUẢN LÝ KHO ẢNH & BẢNG STORYBOARD DASHBOARD

### Cấu Trúc Thư Mục Thành Phẩm:
```
outputs/anh_da_tao/
├── scene_01_tan_ca_muon_dem_ram.png           (166 KB)
├── scene_02_dung_truoc_hang_den_trung_thu.png   (939 KB)
├── scene_03_phong_tro_vang_va_chiec_banh.png    (98 KB)
├── scenes_manifest.json                         (Nhật ký siêu dữ liệu chi tiết)
└── dashboard_sync_data.json                     (Dữ liệu đồng bộ Dashboard)
```

### Xem Bảng Storyboard Dashboard:
Mở tệp [wintop_storyboard_dashboard.html](file:///c:/Users/Admin/Desktop/T%E1%BA%A1o%20%E1%BA%A3nh%20t%E1%BB%B1%20%C4%91%E1%BB%99ng/wintop_storyboard_dashboard.html) trên bất kỳ trình duyệt nào để:
- Xem trước toàn bộ các phân cảnh dưới dạng thẻ card điện ảnh.
- Kiểm tra thông số prompt, điểm kiểm định Safe Zone (PASSED) và kích thước file.
- Trình chiếu cho Ban Giám đốc và bàn giao đường dẫn cho Media Buyer triển khai chạy Ads.

---

## PHẦN 7: SỔ TAY XỬ LÝ SỰ CỐ (TROUBLESHOOTING & EDGE CASES)

| Sự cố phát sinh | Nguyên nhân | Biện pháp xử lý ngay lập tức |
|---|---|---|
| **Lỗi kết nối Chrome cổng 9222** | Chưa đóng các cửa sổ Chrome cũ trước khi chạy file batch | Mở Task Manager, đóng toàn bộ tiến trình `chrome.exe`, sau đó chạy lại `launch_chrome_debug.bat`. |
| **GPT render quá thời gian (>90s)** | Mạng chậm hoặc máy chủ OpenAI quá tải | Hệ thống kích hoạt cơ chế **Smart Retry** (tự thử lại 1 lần). Nếu vẫn quá 90s, hệ thống tạm hoãn cảnh đó và chạy tiếp các cảnh còn lại. |
| **Người dùng tắt máy giữa chừng** | Gián đoạn tiến trình | Mở lại công cụ, hệ thống kích hoạt **Resume Session**: tự động đọc `scenes_manifest.json` và chỉ chạy tiếp các phân cảnh chưa hoàn thành. |
| **Khuôn mặt nhân vật bị lệch (Face drift)** | Prompt cảnh sau thiếu thông số nhân vật | Bổ sung lại các từ khóa nhân trắc học cố định: *"30-year-old Vietnamese mother, oval face, gentle tender eyes, dark hair tied back in a bun"*. |

---

## PHẦN 8: BẢNG TIÊU CHUẨN NGHIỆM THU CHẤT LƯỢNG TRƯỚC KHI BÀN GIAO

Mỗi hình ảnh trước khi bàn giao cho bộ phận Media Buyer bắt buộc phải đạt đủ 5 điểm kiểm tra:
- `[✓]` **Safe Zone 1/3**: Lon sữa Wintop và Mascot nằm ở 1/3 góc phải hoặc góc dưới, không che mặt người.
- `[✓]` **Nhận diện thương hiệu**: Nhãn lon Wintop sắc nét, hệ màu Xanh dương `#00529B` và Vàng kim `#F5A623` chuẩn xác.
- `[✓]` **Đồng bộ ánh sáng (Compositing)**: Có bóng tiếp xúc (Contact shadow) trên mặt phẳng và ánh sáng ven (Rim light).
- `[✓]` **Giải phẫu bàn tay**: Bàn tay đủ 5 ngón, không bị dị tật hay dính ngón.
- `[✓]` **Đa tỷ lệ chuẩn**: Có đầy đủ các kích thước phù hợp với kênh phân phối (`1:1` cho Facebook Feed, `9:16` cho TikTok/Reels, `16:9` cho YouTube).
