export default {
  async fetch(request, env, ctx) {
    const cf = request.cf || {};
    const userIP = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    const userRegion = cf.region || cf.city || '未知地区';
    const userCountry = cf.country || 'XX';
    const userISP = cf.asOrganization || '未知运营商';
    
    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coming Soon | cf.te.lezi.chat</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --cf-orange: #f38020;
            --cf-deep: #050d1a;
            --line: rgba(130, 177, 255, 0.1);
        }
        body {
            background-color: var(--cf-deep);
            color: #e9f1ff;
            font-family: Inter, -apple-system, sans-serif;
            overflow-x: hidden;
        }
        .bg-grid {
            position: fixed;
            inset: 0;
            background-image:
                linear-gradient(var(--line) 1px, transparent 1px),
                linear-gradient(90deg, var(--line) 1px, transparent 1px);
            background-size: 44px 44px;
            opacity: 0.4;
            animation: gridShift 26s linear infinite;
            z-index: 0;
        }
        .pulse-scan {
            position: fixed;
            inset: -30% 0;
            background: linear-gradient(
                180deg,
                transparent 35%,
                rgba(87, 185, 255, 0.03) 48%,
                rgba(87, 185, 255, 0.08) 50%,
                rgba(87, 185, 255, 0.03) 52%,
                transparent 65%
            );
            animation: scan 8s ease-in-out infinite;
            pointer-events: none;
            z-index: 1;
        }
        .panel {
            background: linear-gradient(160deg, rgba(15,30,56,0.7), rgba(8,18,36,0.6));
            border: 1px solid rgba(130, 177, 255, 0.15);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
        }
        @keyframes gridShift {
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-44px, -44px, 0); }
        }
        @keyframes scan {
            0%, 100% { transform: translateY(-30%); opacity: 0; }
            50% { transform: translateY(30%); opacity: 1; }
        }
        @keyframes dot-ping {
            0% { box-shadow: 0 0 0 0 rgba(0, 210, 106, 0.6); }
            70% { box-shadow: 0 0 0 10px rgba(0, 210, 106, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 210, 106, 0); }
        }
        .dot-ping { animation: dot-ping 2s infinite; }
        .text-glow { text-shadow: 0 0 15px rgba(243, 128, 32, 0.3); }
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(8px);
            z-index: 100;
            display: none;
            justify-content: center;
            align-items: center;
        }
        .modal-overlay.active { display: flex; }
        .modal-box {
            background: linear-gradient(160deg, rgba(15,30,56,0.95), rgba(8,18,36,0.95));
            border: 1px solid rgba(243, 128, 32, 0.3);
            border-radius: 16px;
            padding: 32px;
            max-width: 480px;
            text-align: center;
        }
    </style>
</head>
<body class="min-h-screen relative">
    <div class="bg-grid"></div>
    <div class="pulse-scan"></div>

    <!-- 弹窗 -->
    <div class="modal-overlay" id="ipModal">
        <div class="modal-box">
            <div class="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-lucide="check-circle" class="w-8 h-8 text-green-400"></i>
            </div>
            <h2 class="text-2xl font-bold mb-4">身份识别完成</h2>
            <p class="text-slate-300 mb-2">
                您的 IP <b class="text-white">${userIP}</b> 已被识别为<br/>
                <b class="text-orange-400">${userRegion}, ${userCountry} / ${userISP}</b>
            </p>
            <p class="text-green-400 font-semibold">核心已为您预留分流席位。</p>
            <button onclick="closeModal()" class="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">关闭</button>
        </div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8">
        <!-- Header -->
        <header class="panel px-6 py-4 flex justify-between items-center">
            <div class="text-lg font-bold tracking-tight">cf.te.lezi<span class="text-[#f38020]">.chat</span></div>
            <div class="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full text-xs font-semibold text-[#bfeecf]">
                <span class="w-2 h-2 bg-[#00d26a] rounded-full dot-ping"></span>
                System Core: Running
            </div>
        </header>

        <!-- Hero -->
        <section class="hero panel p-10 md:p-16 relative overflow-hidden">
            <div class="absolute top-0 right-0 p-8 opacity-10">
                <i data-lucide="shield-check" class="w-32 h-32 text-orange-500"></i>
            </div>
            <div class="badge inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-md mb-6">
                <i data-lucide="cpu" class="w-3 h-3"></i> 2026 Next Launch
            </div>
            <h1 class="text-4xl md:text-7xl font-black mb-6 leading-tight">
                <span class="text-orange-500 text-glow italic">Coming Soon</span><br />
                SmartRoute: The AI <br />Surgeon for CF Networks.
            </h1>
            <p class="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                告别盲目优选。众包实时反馈 + AI 逻辑调度，精准定义你的每一跳。
            </p>
            <!-- 按钮 -->
            <div class="flex flex-col sm:flex-row gap-4">
                <button onclick="openModal()" class="px-8 py-4 bg-white text-[#050d1a] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1">
                    查询我的分流席位 <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </button>
                <button disabled class="px-8 py-4 border border-slate-700 rounded-xl text-slate-500 font-bold cursor-not-allowed">
                    实时调度展示 (即将开放)
                </button>
            </div>
        </section>

        <!-- AI Terminal -->
        <div class="panel overflow-hidden">
            <div class="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <div class="flex gap-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                </div>
                <div class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Real-time Diagnostic Kernel</div>
            </div>
            <div class="p-6 font-mono text-sm space-y-3">
                <div class="flex gap-3">
                    <span class="text-slate-600">&gt;&gt;</span>
                    <span class="text-blue-400 font-bold">[INFO]</span> 
                    <span id="log-info">正在初始化中国三网分省调度引擎...</span>
                </div>
                <div class="flex gap-3">
                    <span class="text-slate-600">&gt;&gt;</span>
                    <span class="text-orange-400 font-bold">[WARN]</span> 
                    <span id="log-warn">监听到 2 名用户反馈：广东/移动 晚高峰线路拥塞。</span>
                </div>
                <div class="flex gap-3">
                    <span class="text-slate-600">&gt;&gt;</span>
                    <span class="text-white font-bold">[AI-THINK]</span> 
                    <span id="log-ai" class="text-slate-300">正在对比预选库... 发现腾讯云边缘节点权重占优。</span>
                </div>
                <div class="flex gap-3">
                    <span class="text-slate-600">&gt;&gt;</span>
                    <span class="text-green-400 font-bold">[ACTION]</span> 
                    <span id="log-action" class="text-green-500/80">已执行解析变更：广东/移动 -&gt; cf.tencentapp.cn.</span>
                </div>
            </div>
        </div>

        <!-- Features -->
        <section class="grid md:grid-cols-3 gap-6">
            <article class="panel p-8 group hover:border-orange-500/30 transition-all">
                <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="eye"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">实时透明</h3>
                <p class="text-sm text-slate-400">AI 思考原始逻辑全公开，路径选择依据可追踪、可解释、可验证。</p>
            </article>
            <article class="panel p-8 group hover:border-orange-500/30 transition-all">
                <div class="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="navigation"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">省秒匹配</h3>
                <p class="text-sm text-slate-400">分省精准调度，在每一个行政区给出最优回源方案，解决地域性丢包。</p>
            </article>
            <article class="panel p-8 group hover:border-orange-500/30 transition-all">
                <div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                    <i data-lucide="zap"></i>
                </div>
                <h3 class="text-lg font-bold mb-2">AI 驱动自愈</h3>
                <p class="text-sm text-slate-400">结合 ITDog 实时探测与 AI 判断，秒级响应并自动切换更健康的网络路径。</p>
            </article>
        </section>

        <!-- Footer -->
        <footer class="panel px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>&copy; 2026 SmartRoute. Surgical Precision.</div>
            <div class="flex gap-6">
                <a href="#" class="hover:text-white transition-colors">CloudFlare</a>
                <a href="#" class="hover:text-white transition-colors">GitHub</a>
                <a href="#" class="hover:text-white text-orange-400 font-bold">Live Beta</a>
            </div>
        </footer>
    </div>

    <script>
        lucide.createIcons();

        function openModal() {
            document.getElementById('ipModal').classList.add('active');
        }
        
        function closeModal() {
            document.getElementById('ipModal').classList.remove('active');
        }

        const infoLogs = [
            "正在初始化中国三网分省调度引擎...",
            "正在扫描全球 Cloudflare Anycast 节点漂移...",
            "正在同步 DNS 解析库...",
            "正在预热边缘节点连接池...",
            "正在分析最近 5 分钟的丢包数据..."
        ];
        
        const warnLogs = [
            "监听到 2 名用户反馈：广东/移动 晚高峰线路拥塞。",
            "监听到 3 名用户反馈：江苏/电信 丢包率升至 8%。",
            "监听到 1 名用户反馈：黑龙江/联通 延迟飙升至 320ms。",
            "监听到 4 名用户反馈：浙江/移动 出口带宽严重受限。",
            "监听到 2 名用户反馈：北京/联通 晚间路由震荡。"
        ];
        
        const aiLogs = [
            "正在对比预选库... 发现cf.tencentapp.cn边缘节点权重占优。",
            "分析中... www.visa.cn节点在华东地区表现最佳。",
            "计算路由权重... mfa.gov.ua 对联通友好度 +15%。",
            "预测模型显示：切换后丢包率将下降 85%。",
            "BGP 路径分析：建议绕行香港 IX 出口。"
        ];
        
        const actionLogs = [
            "已执行解析变更：广东/移动 → cf.tencentapp.cn.",
            "已执行解析变更：江苏/电信 → www.visa.cn.",
            "已执行解析变更：黑龙江/联通 → mfa.gov.ua.",
            "已执行解析变更：浙江/移动 → shopify.com.",
            "已执行解析变更：北京/联通 → ip.sb."
        ];

        const CURSOR = "▋";

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let activeEl = null;
        let activeBaseText = "";
        let cursorVisible = true;

        function setActive(el, baseText) {
            activeEl = el;
            activeBaseText = baseText;
            activeEl.innerText = activeBaseText + CURSOR;
        }

        function clearActiveKeepText() {
            if (activeEl) {
                activeEl.innerText = activeBaseText;
            }
            activeEl = null;
            activeBaseText = "";
        }

        function clearAllLogs() {
            document.getElementById('log-info').innerText = "";
            document.getElementById('log-warn').innerText = "";
            document.getElementById('log-ai').innerText = "";
            document.getElementById('log-action').innerText = "";
        }

        setInterval(() => {
            if (!activeEl) return;
            cursorVisible = !cursorVisible;
            activeEl.innerText = activeBaseText + (cursorVisible ? CURSOR : " ");
        }, 420);

        async function typeLine(el, text, speed = 24, pauseAfter = 380) {
            setActive(el, "");
            await sleep(120);

            for (let i = 0; i < text.length; i++) {
                activeBaseText = text.slice(0, i + 1);
                activeEl.innerText = activeBaseText + CURSOR;
                await sleep(speed);
            }

            await sleep(pauseAfter);
            clearActiveKeepText();
        }

        let idx = 0;

        async function playLogs() {
            const infoEl = document.getElementById('log-info');
            const warnEl = document.getElementById('log-warn');
            const aiEl = document.getElementById('log-ai');
            const actionEl = document.getElementById('log-action');

            while (true) {
                const i = idx % infoLogs.length;

                // 每一轮开始：先清空全部终端内容
                clearAllLogs();
                await sleep(250);

                // 逐行输出，只有当前行有光标
                await typeLine(infoEl, infoLogs[i], 20, 260);
                await typeLine(warnEl, warnLogs[i], 22, 260);
                await typeLine(aiEl, aiLogs[i], 24, 260);
                await typeLine(actionEl, actionLogs[i], 20, 420);

                idx++;
                await sleep(650);
            }
        }

        playLogs();
    </script>
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
