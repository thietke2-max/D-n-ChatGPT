---
type: brainstorm
feature: {{feature}}
status: draft
updated: {{date}}
links: {{links}}
---

# {{title}}

## 1. Idea Seed

{{seed}}

*Raw input từ user — câu/đoạn description gốc.*

## 2. Context

{{context}}

*Background, why now, related features, market signal.*

## 3. User Types (preliminary)

| User Type | Pain Point | Primary Need |
|---|---|---|
| {{user_type}} | {{pain}} | {{need}} |

## 4. Capabilities Breakdown

### P0 — must have (Bắt buộc)
{{p0_capabilities}}

### P1 — should have (Nên có)
{{p1_capabilities}}

### P2 — nice to have (Có thì tốt)
{{p2_capabilities}}

## 5. Core Flows (Happy Path)

### 5.1 {{flow_1_name}}

1. {{step_1}}
2. {{step_2}}
3. {{step_3}}

```
{{ascii_flow_1}}
```

### 5.2 {{flow_2_name}}

1. ...

```
{{ascii_flow_2}}
```

*Liệt kê đủ flows chính. Mỗi flow độc lập, có ASCII flow riêng nếu phức tạp (OAuth, Payment, Redirect, Phân nhánh).*

## 6. System Behavior Deep Dive

### 6.1 Decision Points

| ID | Flow | Khi nào (Điều kiện) | YES (Nhánh đồng ý) | NO (Nhánh từ chối) |
|---|---|---|---|---|
| D1 | {{flow_name}} | {{condition}} | {{yes_action}} | {{no_action}} |

### 6.2 Scenario Matrix (Ma trận Kịch bản)

| From State | To State | Rule | Action | Result |
|---|---|---|---|---|
| {{from_state}} | {{to_state}} | {{rule}} | {{action}} | {{result}} |

### 6.3 State Transitions (Chuyển đổi Trạng thái)

```
{{entity}}: {{state_a}} → {{state_b}} → {{state_c}}
                      ↘ {{state_d}} (thất bại/hủy)
```

| Entity | Từ | Sang | Trigger | Quay lại được? |
|---|---|---|---|---|
| {{entity}} | {{from}} | {{to}} | {{trigger}} | có/không |

### 6.4 Interrupted Transactions (Xử lý Giao dịch Gián đoạn)

| Tình huống | Hệ thống còn lại gì | Resume (Khôi phục) | Cleanup (Dọn dẹp) |
|---|---|---|---|
| Browser/app đóng giữa flow | {{state}} | {{resume}} | {{cleanup}} |
| External service fail/timeout | {{state}} | {{resume}} | {{cleanup}} |
| Link/token hết hạn | {{state}} | {{resume}} | {{cleanup}} |
| 2 device cùng action | {{state}} | {{resume}} | {{cleanup}} |
| Flow mới khi flow cũ pending | {{state}} | {{resume}} | {{cleanup}} |

### 6.5 Other Edge Cases
{{edge_cases}}

## 7. Validation, Limits & Wording

### 7.1 Validation rules

| Field | Rule (Ràng buộc định dạng, độ dài, required, unique) |
|---|---|
| {{field}} | {{validation_rule}} |

### 7.2 Limits & Quotas (Exact Values - Số liệu chính xác)

| Tham số | Giá trị | Window (Khung thời gian) | Behavior khi vượt ngưỡng |
|---|---|---|---|
| {{limit_name}} | {{value}} | {{window}} | {{action}} |

### 7.3 Wording samples (Exact Strings - Chuỗi thông báo chính xác)

#### Error messages (Thông báo Lỗi)
| Tình huống | Wording hiển thị | Mã Code |
|---|---|---|
| {{error_case}} | "{{exact_string}}" | E-? |

#### Success messages (Thông báo Thành công)
| Tình huống | Wording hiển thị |
|---|---|
| {{success_case}} | "{{exact_string}}" |

#### Info / Neutral messages (Thông báo Hướng dẫn / Thông tin)
| Tình huống | Wording hiển thị |
|---|---|
| {{info_case}} | "{{exact_string}}" |

## 8. Assumptions (Giả định cốt lõi)
{{assumptions}}

## 9. Business Risks (Rủi ro Nghiệp vụ)

| Rủi ro | Khả năng | Hậu quả nghiệp vụ | Cách phòng ngừa |
|---|---|---|---|
| {{risk}} | Thường / Thỉnh thoảng / Hiếm | {{impact_business}} | {{mitigation}} |

## 10. Success Criteria (Tiêu chí Thành công sơ bộ)
{{success_criteria}}

## 11. Open Questions (Câu hỏi còn bỏ ngỏ)
- [ ] OQ-1: {{open_question_1}}
- [ ] OQ-2: {{open_question_2}}
- [ ] OQ-3: {{open_question_3}}

## 12. Next Steps (Các bước tiếp theo)
- `/urd {{feature}}` — Phân tích góc nhìn người dùng
- `/prd {{feature}}` — Soạn thảo tài liệu yêu cầu sản phẩm
- `/srs {{feature}}` — Đặc tả kỹ thuật hệ thống
