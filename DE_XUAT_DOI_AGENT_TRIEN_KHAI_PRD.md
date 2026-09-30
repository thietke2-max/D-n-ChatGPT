# ĐỀ XUẤT CƠ CẤU ĐỘI AGENT (MULTI-AGENT SWARM) TRIỂN KHAI THEO PRD

Hệ thống được thiết kế theo mô hình **Parallel Subagent Swarm (Orchestrator + Specialized Workers)** nhằm đảm bảo tốc độ tạo ảnh dưới 60s/ảnh, tuân thủ 100% nhận diện thương hiệu Wintop và tôn trọng trạm dừng phê duyệt Human Approval Gate.

---

## 1. Sơ Đồ Cơ Cấu 5 Tác Nhân Chuyên Môn (Agent Hierarchy)

```
              ┌──────────────────────────────────────────────┐
              │  1. MASTER FLOW ORCHESTRATOR (DIRECTOR AGENT)│
              │  - Chỉ huy tổng thể, DAG Pipeline            │
              │  - Điều phối hàng đợi, quản lý trạm dừng     │
              └──────────────────────┬───────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ 2. SCENE SYNTHESIS & │  │ 3. HUMAN GATE &      │  │ 4. BROWSER GPT       │
│    PROMPT SPECIALIST │  │    CONSISTENCY AGENT │  │    AUTOMATION AGENT  │
│ - Bóc tách kịch bản  │  │ - Duyệt Safe Zone 1/3│  │ - Chrome CDP Port 9222│
│ - Cinematic Prompt   │  │ - Khóa Face ID mẫu   │  │ - Nạp prompt vào GPT │
│ - Phối cảnh 35mm f1.8│  │ - Nhận diện màu brand│  │ - Tải ảnh về outputs/│
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
                                                               │
                                                               ▼
                                              ┌─────────────────────────────────┐
                                              │ 5. PACKAGING & DASHBOARD AGENT  │
                                              │ - Ghi vết scenes_manifest.json  │
                                              │ - Xuất bản Storyboard Dashboard │
                                              │ - Kích hoạt Feedback Loop       │
                                              └─────────────────────────────────┘
```

---

## 2. Đặc Tả Chi Tiết 5 Thành Viên Trong Đội Agent

### Agent 1: Master Flow Orchestrator (Tổng Chỉ Huy - Wintop Director)
* **Loại hình**: Supervisor Orchestrator Agent.
* **Đầu vào**: Đề bài chiến dịch marketing, 3 slot ảnh mẫu (Mẹ, Lon sữa, Mascot), file kịch bản.
* **Nhiệm vụ cốt lõi**:
  - Khởi tạo phiên làm việc (Session ID) và quản trị đồ thị thực thi DAG.
  - Điều phối các tác nhân con theo đúng 3 Stage trong tài liệu PRD.
  - Đóng vai trò cầu nối tại **Stage 2 (Human Gate)**: dừng hệ thống chờ tín hiệu "Approved" từ Creative Director mới mở luồng sinh ảnh.
* **Đầu ra**: Lệnh kích hoạt từng chặng, điều phối tiến trình thời gian thực.

### Agent 2: Scene Synthesis & Cinematic Prompt Agent (Chuyên Gia Bóc Tách Kịch Bản)
* **Loại hình**: Creative Prompt Specialist Agent.
* **Đầu vào**: Kịch bản thô (.docx, .xlsx), thông điệp cốt lõi (USP).
* **Nhiệm vụ cốt lõi**:
  - Bóc tách kịch bản thành danh sách Scene Stacks (Scene 01 đến Scene N).
  - Soạn thảo Prompt tiếng Anh điện ảnh chuẩn 5 thành tố:
    `[Subject & Action] + [Environment & Mood] + [Brand Asset Placement] + [Camera Angle & Lighting] + [Style & Quality]`.
  - Tính toán trước tọa độ Safe Zone 1/3 (bên phải hoặc góc dưới) để chừa khoảng thở cho lon sữa Wintop.
* **Đầu ra**: Mảng JSON danh sách phân cảnh chuẩn hóa (`scenes_payload.json`).

### Agent 3: Human Gate & Brand Consistency Guardian (Chuyên Gia Bảo Hộ Nhận Diện & An Toàn)
* **Loại hình**: Quality & Brand Safety Inspector.
* **Đầu vào**: Bảng phân cảnh đề xuất, bộ quy chuẩn `brand_rules.json`, ảnh chân dung mẫu.
* **Nhiệm vụ cốt lõi**:
  - Trình chiếu bảng phân cảnh trực quan cho Creative Director tại **Human Approval Gate (Tô đỏ)**.
  - Soát xét hệ màu nhận diện: Xanh `#00529B` và Vàng kim `#F5A623`.
  - Giám sát độ tương đồng khuôn mặt (**Face ID Consistency >= 95%**).
  - Soi lỗi giải phẫu AI (bàn tay 5 ngón, không dính ngón, mắt tự nhiên).
* **Đầu ra**: Phiếu phê duyệt `GATE_VERDICT: APPROVED` kèm checklist đạt chuẩn.

### Agent 4: Browser GPT Automation Agent (Cầu Nối Trình Duyệt & Tải Ảnh)
* **Loại hình**: Browser Subagent / CDP Controller.
* **Đầu vào**: Cổng gỡ lỗi Chrome DevTools Protocol (`localhost:9222`), prompt từng phân cảnh đã duyệt.
* **Nhiệm vụ cốt lõi**:
  - Tự động gắn kết vào phiên trình duyệt Chrome đang mở sẵn tài khoản ChatGPT của người dùng.
  - Gửi prompt từng phân cảnh vào khung chat của GPT/Skill.
  - Lắng nghe sự kiện thẻ `<img>` kết quả từ OpenAI/DALL-E 3 (Timeout tối đa 90s, cơ chế Smart Retry 1 lần).
  - Trích xuất URL ảnh gốc, tự động tải về máy và đặt tên chuẩn: `outputs/anh_da_tao/scene_{id:02d}_{slug}.png`.
* **Đầu ra**: Bộ tệp ảnh gốc 4K đã tải về máy tính cục bộ.

### Agent 5: Packaging & Storyboard Dashboard Agent (Chuyên Gia Đóng Gói & Xuất Bản)
* **Loại hình**: Production & Reporting Specialist.
* **Đầu vào**: Thư mục ảnh `outputs/anh_da_tao/`, thông tin phân cảnh và kết quả audit.
* **Nhiệm vụ cốt lõi**:
  - Ghi nhận nhật ký siêu dữ liệu vào `outputs/anh_da_tao/scenes_manifest.json`.
  - Tự động biên dịch và làm mới trang HTML Storyboard Dashboard (`wintop_storyboard_dashboard.html`).
  - Hỗ trợ đóng gói 3 tỉ lệ (`1:1`, `9:16`, `16:9`) bàn giao cho Media Buyer.
  - Kích hoạt **Feedback Loop**: hỏi người dùng góp ý để lưu vào `learnings.md` và `brand_rules.json`.
* **Đầu ra**: Dashboard hoàn chỉnh, báo cáo tổng quan quy trình và bản cập nhật tri thức.
