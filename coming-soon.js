export default {
  async fetch(request, env, ctx) {
    const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coming Soon | cf.te.lezi.chat</title>
  <style>
    :root {
      --cf-orange: #f38020;
      --cf-deep: #050d1a;
      --cf-blue: #0b1e3f;
      --cf-cyan: #57b9ff;
      --ok: #00d26a;
      --text: #e9f1ff;
      --muted: #9ab1d3;
      --glass: rgba(255,255,255,0.06);
      --line: rgba(130, 177, 255, 0.14);
    }

    * { box-sizing: border-box; }

    html, body {
      width: 100%;
      min-height: 100%;
      margin: 0;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
      color: var(--text);
      background: radial-gradient(1200px 800px at 80% 20%, #173561 0%, transparent 60%),
                  radial-gradient(800px 500px at 20% 80%, #0c2a52 0%, transparent 55%),
                  linear-gradient(135deg, #050d1a 0%, #09172f 45%, #040914 100%);
      overflow-x: hidden;
    }

    body::before,
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    body::before {
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 44px 44px;
      opacity: 0.35;
      animation: gridShift 26s linear infinite;
    }

    body::after {
      background:
        radial-gradient(circle at 50% 10%, rgba(243,128,32,0.18), transparent 40%),
        radial-gradient(circle at 20% 80%, rgba(87,185,255,0.12), transparent 45%);
      filter: blur(8px);
    }

    .pulse-scan {
      position: fixed;
      inset: -30% 0;
      background: linear-gradient(
        180deg,
        transparent 35%,
        rgba(87, 185, 255, 0.06) 48%,
        rgba(87, 185, 255, 0.16) 50%,
        rgba(87, 185, 255, 0.06) 52%,
        transparent 65%
      );
      animation: scan 7s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    }

    .app {
      position: relative;
      z-index: 2;
      max-width: 1080px;
      margin: 0 auto;
      padding: 28px 20px 44px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .panel {
      background: linear-gradient(160deg, rgba(15,30,56,0.72), rgba(8,18,36,0.68));
      border: 1px solid rgba(130, 177, 255, 0.22);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 16px;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06);
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px;
    }

    .logo {
      font-weight: 700;
      letter-spacing: 0.2px;
      font-size: 0.98rem;
    }

    .logo b {
      color: var(--cf-orange);
      font-weight: 800;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #bfeecf;
      font-size: 0.84rem;
      border: 1px solid rgba(0,210,106,0.35);
      background: rgba(0,210,106,0.08);
      border-radius: 999px;
      padding: 6px 12px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ok);
      box-shadow: 0 0 0 0 rgba(0, 210, 106, 0.9);
      animation: ping 2s infinite;
    }

    .hero {
      padding: 46px 28px 40px;
      position: relative;
      overflow: hidden;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      color: #ffd7b6;
      border: 1px solid rgba(243,128,32,0.45);
      background: rgba(243,128,32,0.12);
      border-radius: 999px;
      padding: 6px 12px;
      text-transform: uppercase;
      letter-spacing: .08em;
    }

    h1 {
      margin: 18px 0 12px;
      font-size: clamp(1.7rem, 4.2vw, 3rem);
      line-height: 1.15;
      max-width: 780px;
      text-wrap: balance;
      text-shadow: 0 0 18px rgba(87, 185, 255, 0.16), 0 0 2px rgba(255,255,255,0.25);
    }

    .coming {
      display: inline-block;
      color: var(--cf-orange);
      text-shadow: 0 0 16px rgba(243,128,32,0.45);
    }

    .desc {
      margin: 0;
      max-width: 760px;
      color: var(--muted);
      font-size: clamp(0.97rem, 1.6vw, 1.06rem);
      line-height: 1.75;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(3, minmax(0,1fr));
      gap: 14px;
    }

    .feature {
      padding: 18px 16px;
    }

    .feature h3 {
      margin: 0 0 8px;
      font-size: 1rem;
    }

    .feature p {
      margin: 0;
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.62;
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 14px 18px;
      margin-top: auto;
      font-size: 0.86rem;
      color: #96accd;
    }

    a {
      color: #c9dcff;
      text-decoration: none;
      border-bottom: 1px dashed rgba(201,220,255,0.35);
    }

    a:hover { color: #fff; }

    @media (max-width: 860px) {
      .features { grid-template-columns: 1fr; }
      .hero { padding: 36px 20px 28px; }
    }

    @keyframes gridShift {
      0% { transform: translate3d(0,0,0); }
      100% { transform: translate3d(-44px, -44px, 0); }
    }

    @keyframes scan {
      0%,100% { transform: translateY(-15%); opacity: 0; }
      20% { opacity: 1; }
      50% { transform: translateY(25%); opacity: 1; }
      80% { opacity: 0.7; }
    }

    @keyframes ping {
      0% { box-shadow: 0 0 0 0 rgba(0, 210, 106, 0.75); }
      70% { box-shadow: 0 0 0 12px rgba(0, 210, 106, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 210, 106, 0); }
    }
  </style>
</head>
<body>
  <div class="pulse-scan"></div>
  <main class="app">
    <header class="panel">
      <div class="logo">cf.te.<b>lezi.chat</b></div>
      <div class="status"><span class="dot"></span>Status: Running</div>
    </header>

    <section class="hero panel">
      <span class="badge">Cloudflare Worker • Next Launch</span>
      <h1>
        <span class="coming">Coming Soon</span><br />
        SmartRoute: The AI Surgeon for CF.
      </h1>
      <p class="desc">
        告别盲目优选。众包实时反馈 + AI 逻辑调度，精准定义你的每一跳。<br />
        为 Cloudflare 网络策略提供更快、更透明、更智能的路径决策。
      </p>
    </section>

    <section class="features">
      <article class="feature panel">
        <h3>👁️ 实时透明</h3>
        <p>AI 思考原始逻辑全公开，路径选择依据可追踪、可解释、可验证。</p>
      </article>
      <article class="feature panel">
        <h3>🛰️ 省秒匹配</h3>
        <p>全三网分省精准调度，尽可能在每个地区都给出更优的回源与中转方案。</p>
      </article>
      <article class="feature panel">
        <h3>🤖 AI 驱动</h3>
        <p>故障自愈，秒级响应，结合实时状态自动切换更健康的网络路径。</p>
      </article>
    </section>

    <footer class="panel">
      <span>© ${new Date().getFullYear()} cf.te.lezi.chat</span>
      <span><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a> · <a href="#" aria-disabled="true">X / Discord</a></span>
    </footer>
  </main>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }
};
