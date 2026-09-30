---
type: brainstorm
feature: payment
status: draft
updated: 2026-09-13
links:
  - docs/meetings/2026-09-13-client-payment-kickoff.md
---

# Payment Checkout Flow — Brainstorm Example

## 1. Idea Seed
> "Thêm thanh toán online cho ứng dụng e-commerce. Hiện chỉ có COD, mất 35% cart abandon. Client muốn launch v1 Q3, ưu tiên Momo + VNPay + Card. Guest checkout không bắt đăng ký. Returning customer có saved card."

## 2. Context
- Hiện tại: chỉ COD, 35% cart abandon ở checkout step.
- Market: Đối thủ đã có 1-tap checkout, ta chậm 2-3 năm.
- Regulatory: Tuân thủ quy định bảo mật thanh toán ngân hàng nhà nước.
- Internal: Hệ thống chưa đạt PCI-DSS Level 2, cần dùng gateway ngoài tokenize thẻ.

## 3. User Types (preliminary)
| User Type | Pain Point | Primary Need |
|---|---|---|
| Khách mới (guest) | Sợ đăng ký tài khoản rườm rà | Checkout nhanh 1 bước, không cần tài khoản |
| Khách quen (returning) | Phải nhập lại thông tin thẻ mỗi lần mua | Lưu thẻ an toàn (Tokenized), thanh toán 1-click |
| Kế toán / Quản trị | Đối soát thủ công cực nhọc | Bảng đối soát tự động & quy trình hoàn tiền 1 chạm |

## 4. Capabilities Breakdown
### P0 — must have
- Thanh toán Guest qua Momo, VNPay và Thẻ tín dụng/ghi nợ.
- Màn hình xác nhận tổng tiền + phí giao dịch minh bạch.
- Email xác nhận thanh toán thành công tức thì.
- Xử lý lỗi: Gateway timeout, từ chối thẻ, số dư không đủ.
- Hoàn tiền toàn phần (Full refund).

### P1 — should have
- Lưu thẻ cho khách quen qua Tokenization.
- Gửi SMS xác nhận song song với Email.
- Bộ lọc & tìm kiếm giao dịch nâng cao cho Admin.

### P2 — nice to have
- Hỗ trợ thẻ ATM nội địa Napas.
- Hoàn tiền từng phần (Partial refund).
- Cảnh báo gian lận tự động (Fraud detection basic).

## 5. Core Flows (Happy Path)
### 5.1 Guest Checkout Flow
1. Khách bấm "Đặt hàng" tại Giỏ hàng.
2. Chọn phương thức: "Thanh toán Online qua Cổng VNPay".
3. Hệ thống chuyển hướng (redirect) sang màn hình thanh toán VNPay.
4. Khách quét mã QR hoặc nhập OTP ngân hàng thành công.
5. Cổng gửi Webhook về hệ thống -> Đổi trạng thái đơn sang "ĐÃ THANH TOÁN" -> Chuyển hướng khách về màn hình cảm ơn.

```
[Giỏ hàng] ---> [Chọn VNPay] ---> [Redirect Gateway]
                                          │
[Trang Cảm ơn] <--- [Webhook OK] <--------┘
```

## 6. System Behavior Deep Dive
### 6.1 Decision Points
| ID | Flow | Khi nào | YES (Đồng ý) | NO (Từ chối) |
|---|---|---|---|---|
| D1 | Thanh toán | Số dư tài khoản đủ? | Trừ tiền & gửi Webhook thành công | Báo lỗi E-PAY-01, giữ giỏ hàng 15p |
| D2 | Webhook | Chữ ký điện tử (Signature) khớp? | Cập nhật đơn hàng thành ĐÃ THANH TOÁN | Ghi log bảo mật, không cập nhật đơn |

### 6.4 Interrupted Transactions
| Tình huống | Hệ thống còn lại gì | Khôi phục (Resume) | Dọn dẹp (Cleanup) |
|---|---|---|---|
| Đóng app/trình duyệt khi đang quét QR | Đơn ở trạng thái Chờ thanh toán | Khách mở lại app thấy nút "Tiếp tục thanh toán" | Hủy đơn sau 15 phút nếu không có Webhook |
| Cổng thanh toán timeout > 30s | Đơn pending | Chạy polling tự động kiểm tra trạng thái sau 1 phút | Nếu gateway báo thất bại: Mở lại giỏ hàng |

## 7. Validation, Limits & Wording
### 7.2 Limits & Quotas
| Tham số | Giá trị | Window | Behavior khi vượt |
|---|---|---|---|
| Thử thanh toán sai OTP | Tối đa 3 lần | 10 phút | Khóa phương thức thanh toán này trong 30 phút |
| Giá trị giao dịch tối thiểu | 10.000 VNĐ | Mỗi giao dịch | Chặn thanh toán, báo lỗi E-PAY-03 |

### 7.3 Wording Samples
- **Error:** *"Giao dịch chưa hoàn tất do số dư không đủ. Vui lòng kiểm tra lại tài khoản hoặc chọn phương thức khác."* (Mã: `E-PAY-01`)
- **Success:** *"Thanh toán thành công! Đơn hàng #[ID] của bạn đang được chuẩn bị."*
