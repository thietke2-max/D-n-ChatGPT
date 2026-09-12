// ==UserScript==
// @name         Wintop AI Studio - Google Flow Auto-Pilot Tool
// @namespace    https://wintop.vn/
// @version      4.0
// @description  Tự động hóa bóc tách kịch bản, nạp nhân vật và điều khiển tạo ảnh theo PRD Wintop trên Google Flow
// @match        https://labs.google/fx/*
// @match        https://flow.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("[Wintop AI] Khởi động công cụ tự động hóa trên Google Flow...");

    // Dữ liệu 14 phân cảnh chuẩn hóa từ kịch bản Trung Thu Wintop V3
    const WINTOP_SCENES = [
        {
            id: 1,
            title: "Scene 01: Tan ca muộn đêm rằm",
            char: "Mẹ công nhân (Mẫu)",
            prompt: "Cinematic shot of a tired Vietnamese female factory worker in work clothes, walking her motorbike out of a quiet factory gate at night, soft street lights, melancholic atmosphere, highly detailed, realistic, 4k.",
            safe_zone: "Center",
            ratio: "16:9"
        },
        {
            id: 2,
            title: "Scene 02: Dừng trước hàng đèn Trung thu",
            char: "Mẹ công nhân",
            prompt: "Close-up portrait of a 30-year-old Vietnamese mother looking tenderly at glowing red and yellow star lanterns in a street stall, longing eyes full of love for her daughter, warm nostalgic lighting, 35mm f/1.8 lens.",
            safe_zone: "Center-Left",
            ratio: "16:9"
        },
        {
            id: 3,
            title: "Scene 03: Phòng trọ vắng & Chiếc bánh để phần",
            char: "Mẹ công nhân",
            prompt: "Medium shot in a modest Vietnamese rental room, a mother picking vegetables at a small table, a sealed mooncake placed carefully on the table saved for her child, warm tungsten lamp, emotional quiet atmosphere.",
            safe_zone: "Right-Third (Safe Zone for Wintop Can)",
            ratio: "1:1"
        },
        {
            id: 4,
            title: "Scene 04: Quê rộn ràng chuẩn bị rước đèn",
            char: "Trẻ em làng quê Bắc Bộ",
            prompt: "Wide angle cinematic shot of a lively traditional northern Vietnamese village brick lane during Mid-Autumn, happy children holding glowing star lanterns running and laughing together, festive village atmosphere.",
            safe_zone: "Wide",
            ratio: "16:9"
        },
        {
            id: 5,
            title: "Scene 05: Bé Lan trong nhà nhớ mẹ",
            char: "Bé Lan 5 tuổi (Mẫu)",
            prompt: "A cute 5-year-old Vietnamese girl with pigtails sitting on a wooden doorstep holding a star lantern, looking sadly out into the alley watching other kids with their parents, soft evening moonlight, sentimental mood.",
            safe_zone: "Center-Right",
            ratio: "1:1"
        },
        {
            id: 6,
            title: "Scene 06: Bà giục gọi mẹ xem về chưa",
            char: "Bà ngoại (Mẫu) & Bé Lan",
            prompt: "An elderly Vietnamese grandmother with kind wrinkled face handing a smartphone to her cute 5-year-old granddaughter beside a simple dinner table, grandmother smiling warmly, cozy countryside kitchen, authentic rural Vietnam.",
            safe_zone: "Left-Third",
            ratio: "16:9"
        },
        {
            id: 7,
            title: "Scene 07: Cuộc gọi cắt ngang rổ rau",
            char: "Mẹ công nhân (Mẫu)",
            prompt: "In a modest rental room, a mother wiping her hands on her shirt, smoothing her hair and practicing a bright warm smile before answering a video call on her phone, concealing exhaustion, slow cinematic timing.",
            safe_zone: "Center",
            ratio: "16:9"
        },
        {
            id: 8,
            title: "Scene 08: Mẹ ăn cơm chưa?",
            char: "Mẹ & Bé Lan (Video Call)",
            prompt: "Split screen perspective video call: On one side a bright smiling 5yo girl, on the other side a brave mother smiling warmly while gently pushing a half-picked vegetable basket out of camera frame, deep motherly love.",
            safe_zone: "Split",
            ratio: "16:9"
        },
        {
            id: 9,
            title: "Scene 09: Món quà mẹ gửi",
            char: "Bé Lan & Bà ngoại",
            prompt: "A joyful 5yo Vietnamese girl happily bragging on phone call, while in the warm background her grandmother opens a Wintop Colostrum Gain milk carton box, golden rim light, premium wholesome dairy brand aesthetic.",
            safe_zone: "Right-Third (Safe Zone for Wintop Carton)",
            ratio: "1:1"
        },
        {
            id: 10,
            title: "Scene 10: Sữa mẹ gửi ra mâm cỗ",
            char: "Bà ngoại & Bé Lan",
            prompt: "Gentle grandmother packing two 180ml ready-to-drink Wintop milk packs into a cute bag for her granddaughter to take to the village festival feast, authentic rural family warmth, clean focus, natural lighting.",
            safe_zone: "Bottom-Right",
            ratio: "1:1"
        },
        {
            id: 11,
            title: "Scene 11: Điều con mong nhất",
            char: "Mẹ & Bé Lan",
            prompt: "Emotional low-key shot: cute little girl touching her star lantern whispering she wants mother home; mother on video call pausing, biting lip gently, holding back tears, poignant emotional depth, 85mm portrait lens.",
            safe_zone: "Center",
            ratio: "16:9"
        },
        {
            id: 12,
            title: "Scene 12: Bà hiểu lòng con",
            char: "Bà, Mẹ & Bé Lan",
            prompt: "Three generations across video call: loving grandmother placing reassuring hand on granddaughter's shoulder speaking comforting words to her daughter working far away, tender family bond, soft warm color grading.",
            safe_zone: "Wide-Third",
            ratio: "16:9"
        },
        {
            id: 13,
            title: "Scene 13: Hai chiếc bánh để phần nhau",
            char: "Mẹ & Bé Lan",
            prompt: "Twist climax moment: On video call, little girl holds up her saved mooncake at home, while mother in city room holds up her identical saved mooncake to the phone screen, sharing love across distance, radiant tears of warmth.",
            safe_zone: "Center",
            ratio: "16:9"
        },
        {
            id: 14,
            title: "Scene 14: Mang thương yêu ra mâm cỗ",
            char: "Bé Lan & Mascot Hươu Wintop",
            prompt: "A cheerful 5-year-old Vietnamese girl running into a brightly lit village festival yard with lantern and Wintop milk, accompanied by friendly heroic Golden Deer Mascot superhero, fireworks, festive Mid-Autumn night, 4k ultra hd.",
            safe_zone: "Safe Zone for Wintop Colostrum Gain Logo & Badge",
            ratio: "16:9"
        }
    ];

    // Tạo Panel điều khiển Wintop AI nổi trên Google Flow
    function createWintopControlPanel() {
        if (document.getElementById('wintop-ai-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'wintop-ai-panel';
        panel.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            width: 380px;
            max-height: 85vh;
            background: rgba(18, 22, 33, 0.95);
            border: 2px solid #00529B;
            border-radius: 16px;
            padding: 16px;
            z-index: 999999;
            color: #FFFFFF;
            font-family: 'Segoe UI', sans-serif;
            box-shadow: 0 10px 40px rgba(0, 82, 155, 0.5);
            backdrop-filter: blur(10px);
            overflow-y: auto;
        `;

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 24px; height: 24px; background: #F5A623; border-radius: 50%; color: #000; font-weight: bold; display: flex; align-items: center; justify-content: center; font-size: 12px;">W</div>
                    <strong style="color: #38BDF8; font-size: 14px;">Wintop AI &bull; Google Flow Tool</strong>
                </div>
                <span style="font-size: 11px; background: #00529B; padding: 2px 8px; border-radius: 10px; color: #FFF;">PRD v4.0</span>
            </div>

            <div style="background: #1E293B; padding: 10px; border-radius: 8px; margin-bottom: 12px; font-size: 12px;">
                <div style="color: #F5A623; font-weight: bold; margin-bottom: 4px;">&#128205; 3 Slot Tài Nguyên Đã Neo:</div>
                <div>&bull; Nhân vật: Mẹ công nhân &amp; Bé Lan (Mẫu)</div>
                <div>&bull; Sản phẩm: Lon Wintop Colostrum Gain 400g</div>
                <div>&bull; Mascot: Hươu Siêu Nhân Wintop</div>
            </div>

            <div style="margin-bottom: 12px;">
                <label style="font-size: 12px; font-weight: bold; color: #94A3B8; display: block; margin-bottom: 6px;">Chọn Phân Cảnh Để Tự Động Nạp:</label>
                <select id="wintop-scene-select" style="width: 100%; padding: 8px; border-radius: 8px; background: #0F172A; border: 1px solid #38BDF8; color: #FFF; font-size: 12px;">
                    ${WINTOP_SCENES.map(s => `<option value="${s.id}">${s.title} (${s.ratio})</option>`).join('')}
                </select>
            </div>

            <div id="wintop-prompt-preview" style="background: #0F172A; border-left: 3px solid #F5A623; padding: 8px; border-radius: 6px; font-size: 11px; color: #CBD5E1; margin-bottom: 12px; max-height: 80px; overflow-y: auto; font-style: italic;">
                ${WINTOP_SCENES[0].prompt}
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                <button id="btn-apply-prompt" style="flex: 1; background: linear-gradient(135deg, #00529B, #0284C7); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer;">
                    &#9654; Nạp Prompt Vào Google Flow
                </button>
            </div>

            <div style="display: flex; gap: 8px;">
                <button id="btn-auto-run-all" style="flex: 1; background: #065F46; border: 1px solid #10B981; color: #34D399; padding: 8px; border-radius: 8px; font-weight: bold; font-size: 11px; cursor: pointer;">
                    &#9889; Tự Động Chạy Cả 14 Cảnh
                </button>
            </div>
            
            <div style="font-size: 10px; color: #64748B; text-align: center; margin-top: 10px;">
                Đang kết nối phiên Google Flow: labs.google/fx
            </div>
        `;

        document.body.appendChild(panel);

        // Sự kiện khi đổi cảnh
        const select = document.getElementById('wintop-scene-select');
        const preview = document.getElementById('wintop-prompt-preview');
        select.addEventListener('change', (e) => {
            const sc = WINTOP_SCENES.find(s => s.id == e.target.value);
            if (sc) {
                preview.textContent = sc.prompt;
            }
        });

        // Nạp prompt vào ô input của Google Flow
        document.getElementById('btn-apply-prompt').addEventListener('click', () => {
            const sc = WINTOP_SCENES.find(s => s.id == select.value);
            if (!sc) return;

            // Tìm ô input prompt của Google Flow
            const inputs = document.querySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
            let targetInput = null;
            for (let el of inputs) {
                const ph = el.getAttribute('placeholder') || '';
                if (ph.includes('Bạn muốn tạo') || ph.includes('mô tả') || ph.includes('prompt') || el.tagName === 'TEXTAREA') {
                    targetInput = el;
                    break;
                }
            }

            if (targetInput) {
                targetInput.focus();
                if (targetInput.isContentEditable) {
                    targetInput.textContent = sc.prompt;
                } else {
                    targetInput.value = sc.prompt;
                }
                targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                alert(`Đã nạp thành công "${sc.title}" vào ô nhập lệnh của Google Flow! Bấm mũi tên -> để sinh ảnh.`);
            } else {
                navigator.clipboard.writeText(sc.prompt);
                alert(`Đã sao chép Prompt của ${sc.title} vào Clipboard! Bạn có thể nhấn Ctrl+V vào ô nhập lệnh của Google Flow.`);
            }
        });
    }

    // Tự động kiểm tra và chèn Panel khi Google Flow đã load
    let checkInterval = setInterval(() => {
        if (document.body) {
            createWintopControlPanel();
            clearInterval(checkInterval);
        }
    }, 1500);
})();
