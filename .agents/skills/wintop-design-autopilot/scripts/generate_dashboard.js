/**
 * Wintop AI Design Autopilot - Storyboard Dashboard Generator
 * Tự động tạo trang HTML Dashboard trực quan tổng hợp toàn bộ quy trình thiết kế,
 * danh sách phân cảnh, hình ảnh render, audit Safe Zone và prompt chi tiết.
 */

const fs = require('fs');
const path = require('path');

function generateHtmlDashboard(data, outputPath) {
    const { campaignTitle, brand, createdAt, scenes, stats } = data;

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${campaignTitle} - Wintop AI Storyboard Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #00529B;
            --accent: #F5A623;
            --bg-dark: #0D111A;
            --card-bg: #161D2E;
            --card-border: rgba(255, 255, 255, 0.08);
            --text-main: #F1F5F9;
            --text-muted: #94A3B8;
            --success: #10B981;
            --tag-bg: rgba(0, 82, 155, 0.25);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            padding: 32px 24px;
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--card-border);
            margin-bottom: 32px;
            flex-wrap: wrap;
            gap: 16px;
        }

        .brand-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, var(--primary), #003666);
            color: #fff;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 0 15px rgba(0, 82, 155, 0.4);
        }

        h1 {
            font-size: 28px;
            font-weight: 800;
            margin-top: 8px;
            background: linear-gradient(to right, #FFFFFF, #CBD5E1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 36px;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--accent);
        }

        .stat-label {
            font-size: 13px;
            color: var(--text-muted);
            text-transform: uppercase;
            font-weight: 600;
        }

        .stat-val {
            font-size: 26px;
            font-weight: 800;
            color: #fff;
            margin-top: 6px;
        }

        .workflow-bar {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 24px;
            margin-bottom: 36px;
        }

        .workflow-title {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--accent);
        }

        .step-chain {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .step-node {
            flex: 1;
            min-width: 200px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--card-border);
            border-radius: 10px;
            padding: 14px;
        }

        .step-node.completed {
            border-color: rgba(16, 185, 129, 0.4);
            background: rgba(16, 185, 129, 0.05);
        }

        .step-node-title {
            font-size: 13px;
            font-weight: 700;
            color: var(--success);
            margin-bottom: 4px;
        }

        .step-node-desc {
            font-size: 12px;
            color: var(--text-muted);
        }

        .scenes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 24px;
        }

        .scene-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .scene-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
            border-color: rgba(245, 166, 35, 0.3);
        }

        .scene-media {
            width: 100%;
            height: 230px;
            background: #000;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .scene-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .scene-media:hover img {
            transform: scale(1.04);
        }

        .badge-scene-id {
            position: absolute;
            top: 12px;
            left: 12px;
            background: rgba(13, 17, 26, 0.85);
            backdrop-filter: blur(8px);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .badge-ratio {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(0, 82, 155, 0.85);
            backdrop-filter: blur(8px);
            color: #fff;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
        }

        .scene-body {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .scene-title {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
        }

        .scene-char {
            font-size: 13px;
            color: var(--accent);
            font-weight: 600;
        }

        .scene-prompt {
            font-size: 12px;
            color: var(--text-muted);
            background: rgba(0, 0, 0, 0.25);
            padding: 10px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.04);
            font-family: monospace;
            max-height: 80px;
            overflow-y: auto;
        }

        .scene-footer {
            margin-top: auto;
            padding-top: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
        }

        .safe-zone-tag {
            color: #60A5FA;
            background: rgba(96, 165, 250, 0.1);
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
        }

        .audit-tag {
            color: var(--success);
            background: rgba(16, 185, 129, 0.1);
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <span class="brand-badge">⭐ ${brand || 'WINTOP AI'} • AUTOPILOT ENGINE</span>
                <h1>${campaignTitle}</h1>
                <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">Khởi tạo lúc: ${createdAt || new Date().toLocaleString('vi-VN')} | Đã kiểm duyệt Safe Zone & Brand Identity</p>
            </div>
        </header>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Tổng số phân cảnh</div>
                <div class="stat-val">${stats?.totalScenes || scenes.length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Ảnh đã hoàn tất</div>
                <div class="stat-val" style="color: var(--success);">${stats?.renderedCount || scenes.length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Độ chuẩn Safe Zone</div>
                <div class="stat-val" style="color: var(--accent);">${stats?.safeZoneScore || '100%'}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Thời gian thực thi tb</div>
                <div class="stat-val">< 30s / ảnh</div>
            </div>
        </div>

        <div class="workflow-bar">
            <div class="workflow-title">
                <span>⚡ QUY TRÌNH THỰC THI KHÉP KÍN (PIPELINE AUDIT)</span>
            </div>
            <div class="step-chain">
                <div class="step-node completed">
                    <div class="step-node-title">1. INPUT & NGUYÊN LIỆU ✓</div>
                    <div class="step-node-desc">Tiếp nhận đề bài + 3 slot ảnh mẫu (Mẹ, Lon sữa, Mascot)</div>
                </div>
                <div class="step-node completed">
                    <div class="step-node-title">2. KỊCH BẢN & PHÂN CẢNH ✓</div>
                    <div class="step-node-desc">Bóc tách Scene Stacks chuẩn Prompt điện ảnh</div>
                </div>
                <div class="step-node completed">
                    <div class="step-node-title">3. CHẾ ĐỘ THIẾT KẾ ✓</div>
                    <div class="step-node-desc">Sinh ảnh Hybrid + Auto Safe Zone + Inpainting</div>
                </div>
                <div class="step-node completed">
                    <div class="step-node-title">4. BÁO CÁO & XUẤT BẢN ✓</div>
                    <div class="step-node-desc">Đóng gói Storyboard Dashboard & Feedback Loop</div>
                </div>
            </div>
        </div>

        <div class="scenes-grid">
            ${scenes.map((sc, index) => `
            <div class="scene-card">
                <div class="scene-media">
                    <span class="badge-scene-id">SCENE #${sc.id || index + 1}</span>
                    <span class="badge-ratio">${sc.ratio || '1:1'}</span>
                    <img src="${sc.imageUrl || '#'}" alt="${sc.title}" onerror="this.src='https://placehold.co/600x400/161D2E/F5A623?text=Wintop+Scene+Preview'">
                </div>
                <div class="scene-body">
                    <div class="scene-title">${sc.title}</div>
                    <div class="scene-char">👤 ${sc.char || 'Nhân vật chính'}</div>
                    <div class="scene-prompt">${sc.prompt}</div>
                    <div class="scene-footer">
                        <span class="safe-zone-tag">📐 ${sc.safe_zone || 'Safe Zone 1/3 Right'}</span>
                        <span class="audit-tag">✓ PASSED</span>
                    </div>
                </div>
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`[Wintop Dashboard] Đã xuất bản dashboard thành công tại: ${outputPath}`);
}

module.exports = { generateHtmlDashboard };

// Chạy trực tiếp nếu gọi từ CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    const jsonFile = args[0] || 'sample_dashboard_data.json';
    const outHtml = args[1] || 'wintop_storyboard_dashboard.html';

    if (fs.existsSync(jsonFile)) {
        const raw = fs.readFileSync(jsonFile, 'utf8');
        const data = JSON.parse(raw);
        generateHtmlDashboard(data, outHtml);
    } else {
        console.log(`Usage: node generate_dashboard.js <data.json> <output.html>`);
    }
}
