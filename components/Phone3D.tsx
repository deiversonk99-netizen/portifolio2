import React, { useEffect, useRef } from 'react';
import './Phone3D.css';

export const Phone3D: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rigRef = useRef<HTMLDivElement>(null);
    const autoTRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        // ── Particles ──
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext('2d');
        if (!ctx) return;

        let W: number, H: number;
        let pts: any[] = [];

        const resize = () => {
            W = c.width = window.innerWidth;
            H = c.height = window.innerHeight;
        };

        const mkPt = (init: boolean) => ({
            x: Math.random() * W,
            y: init ? Math.random() * H : H + 5,
            r: Math.random() * 1.4 + 0.3,
            s: Math.random() * 0.25 + 0.07,
            d: (Math.random() - 0.5) * 0.25,
            o: Math.random() * 0.35 + 0.05,
            h: [210, 250, 190, 265][Math.floor(Math.random() * 4)]
        });

        const initParticles = () => {
            pts = [];
            for (let i = 0; i < 140; i++) pts.push(mkPt(true));
        };

        resize();
        initParticles();
        window.addEventListener('resize', resize);

        let animationFrame: number;
        const loop = () => {
            ctx.clearRect(0, 0, W, H);
            for (const p of pts) {
                p.y -= p.s;
                p.x += p.d;
                p.o -= 0.00025;
                if (p.y < -5 || p.o <= 0) Object.assign(p, mkPt(false));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.h},75%,72%,${p.o})`;
                ctx.fill();
            }
            animationFrame = requestAnimationFrame(loop);
        };
        loop();

        // ── 3D drag with inertia ──
        const rig = rigRef.current;
        if (!rig) return;

        let drag = false;
        let sx = 0, sy = 0;
        let cx = 6, cy = -22;
        let tx = 6, ty = -22;
        let vx = 0, vy = 0;
        let lx = 0, ly = 0, lt = 0;
        let autoR = true;

        const setT = (rx: number, ry: number) => {
            if (rig) rig.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        };

        const resetAuto = () => {
            if (autoTRef.current) clearTimeout(autoTRef.current);
            autoTRef.current = setTimeout(() => {
                autoR = true;
                tx = 6;
                ty = -22;
            }, 2800);
        };

        let tickFrame: number;
        const tick = () => {
            if (autoR) {
                cx += (tx - cx) * 0.045;
                cy += (ty - cy) * 0.045;
            } else if (!drag) {
                cx += vx;
                cy += vy;
                vx *= 0.92;
                vy *= 0.92;
                cx = Math.max(-38, Math.min(38, cx));
                cy = Math.max(-75, Math.min(45, cy));
            }
            setT(cx, cy);
            tickFrame = requestAnimationFrame(tick);
        };
        tick();

        const down = (x: number, y: number) => {
            drag = true;
            autoR = false;
            if (autoTRef.current) clearTimeout(autoTRef.current);
            sx = x;
            sy = y;
            lx = x;
            ly = y;
            lt = Date.now();
            vx = 0;
            vy = 0;
        };

        const move = (x: number, y: number) => {
            if (!drag) return;
            const now = Date.now();
            const dt = now - lt || 1;
            cy = ty + (x - sx) * 0.36;
            cx = tx - (y - sy) * 0.26;
            cx = Math.max(-38, Math.min(38, cx));
            cy = Math.max(-75, Math.min(45, cy));
            vx = -(y - ly) / dt * 9;
            vy = (x - lx) / dt * 9;
            lx = x;
            ly = y;
            lt = now;
        };

        const up = () => {
            if (!drag) return;
            drag = false;
            tx = cx;
            ty = cy;
            vx = Math.max(-2.5, Math.min(2.5, vx));
            vy = Math.max(-3, Math.min(3, vy));
            resetAuto();
        };

        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            down(e.clientX, e.clientY);
        };

        const handleMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
        const handleMouseUp = () => up();

        const handleTouchStart = (e: TouchEvent) => {
            down(e.touches[0].clientX, e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            move(e.touches[0].clientX, e.touches[0].clientY);
        };

        const handleTouchEnd = () => up();

        rig.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        rig.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
            cancelAnimationFrame(tickFrame);
            if (autoTRef.current) clearTimeout(autoTRef.current);
            rig.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            rig.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas id="bg-canvas" ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

            <div className="scene-3d">
                <div className="rig-3d" id="rig" ref={rigRef}>
                    <div className="phone-3d">
                        <div className="face-back" />
                        <div className="face-left" />
                        <div className="face-right" />
                        <div className="face-top" />
                        <div className="face-bottom" />

                        <div className="btn-3d btn-power-3d" />
                        <div className="btn-3d btn-silent-3d" />
                        <div className="btn-3d btn-vol-up-3d" />
                        <div className="btn-3d btn-vol-down-3d" />

                        <div className="face-front">
                            <div className="screen-3d">
                                <div className="screen-bg-3d" />

                                {/* Status bar */}
                                <div className="statusbar-3d">
                                    <span className="sb-time-3d">9:41</span>
                                    <div className="sb-icons-3d">
                                        <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
                                            <rect x="0" y="4" width="2.5" height="7" rx="0.5" opacity="0.4" />
                                            <rect x="3.5" y="2.5" width="2.5" height="8.5" rx="0.5" opacity="0.6" />
                                            <rect x="7" y="1" width="2.5" height="10" rx="0.5" opacity="0.85" />
                                            <rect x="10.5" y="0" width="2.5" height="11" rx="0.5" />
                                        </svg>
                                        <svg width="13" height="10" viewBox="0 0 13 10" fill="white">
                                            <circle cx="6.5" cy="8.8" r="1.2" fill="white" />
                                            <path d="M3.2 6.2 C4.2 5.0 5.3 4.4 6.5 4.4 S8.8 5.0 9.8 6.2" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                                            <path d="M0.5 3.6 C2.2 1.6 4.2 0.6 6.5 0.6 S10.8 1.6 12.5 3.6" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6" />
                                        </svg>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: 24, height: 12, border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: 3.5, padding: 1.5, display: 'flex', alignItems: 'center' }}>
                                                <div style={{ width: '80%', height: '100%', background: '#fff', borderRadius: 1.5 }} />
                                            </div>
                                            <div style={{ width: 2.5, height: 5, background: 'rgba(255, 255, 255, 0.65)', borderRadius: '0 1.5px 1.5px 0', marginLeft: -0.5 }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Island */}
                                <div className="di-3d">
                                    <div className="di-pill-3d" />
                                    <div className="di-lens-3d" />
                                </div>

                                {/* Main content */}
                                <div className="content-3d">
                                    <div className="greeting-3d">
                                        <div className="greeting-sub-3d">Bem-vindo de volta,</div>
                                        <div className="greeting-name-3d">Alex Chen</div>
                                    </div>

                                    <div className="hero-card-3d">
                                        <div className="hero-label-3d">Saldo Total</div>
                                        <div className="hero-value-3d">$45.280</div>
                                        <div className="hero-badges-3d">
                                            <span className="badge-3d green">↑ +2.4%</span>
                                            <span className="badge-3d white">Este mês</span>
                                        </div>
                                    </div>

                                    <div className="metrics-3d">
                                        <div className="metric-card-3d">
                                            <div className="metric-icon-3d">📈</div>
                                            <div className="metric-val-3d">$12.4K</div>
                                            <div className="metric-lbl-3d">Receita</div>
                                        </div>
                                        <div className="metric-card-3d">
                                            <div className="metric-icon-3d">💸</div>
                                            <div className="metric-val-3d">$3.8K</div>
                                            <div className="metric-lbl-3d">Despesas</div>
                                        </div>
                                        <div className="metric-card-3d">
                                            <div className="metric-icon-3d">🎯</div>
                                            <div className="metric-val-3d">78%</div>
                                            <div className="metric-lbl-3d">Meta</div>
                                        </div>
                                    </div>

                                    <div className="chart-card-3d">
                                        <div className="card-header-3d">
                                            <span className="card-title-3d">Performance</span>
                                            <span className="card-sub-3d">7 dias</span>
                                        </div>
                                        <div className="chart-wrap-3d">
                                            <svg className="chart-svg-3d" viewBox="0 0 248 65" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.38" />
                                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                                    </linearGradient>
                                                    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="#818cf8" />
                                                        <stop offset="45%" stopColor="#3b82f6" />
                                                        <stop offset="100%" stopColor="#06b6d4" />
                                                    </linearGradient>
                                                    <filter id="gf" x="-20%" y="-50%" width="140%" height="200%">
                                                        <feGaussianBlur stdDeviation="1.8" result="b" />
                                                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                                                    </filter>
                                                </defs>
                                                <g>
                                                    <path d="M0,54 C18,50 36,42 58,37 C80,32 100,46 122,32 C144,18 162,30 184,20 C206,10 228,16 248,11 L248,65 L0,65 Z" fill="url(#ag)" />
                                                    <path d="M0,54 C18,50 36,42 58,37 C80,32 100,46 122,32 C144,18 162,30 184,20 C206,10 228,16 248,11" fill="none" stroke="url(#lg)" strokeWidth="2.2" filter="url(#gf)" strokeLinecap="round" />
                                                    <circle cx="58" cy="37" r="3.5" fill="#3b82f6" />
                                                    <circle cx="122" cy="32" r="3" fill="#6366f1" />
                                                    <circle cx="184" cy="20" r="3" fill="#818cf8" />
                                                    <circle cx="248" cy="11" r="4" fill="#06b6d4" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="activity-3d">
                                        <div className="act-item-3d">
                                            <div className="act-icon-3d b">💳</div>
                                            <div className="act-info-3d">
                                                <div className="act-name-3d">Pagamento recebido</div>
                                                <div className="act-time-3d">2 min atrás</div>
                                            </div>
                                            <div className="act-amt-3d pos">+$240</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="home-bar-3d" />
                            </div>
                        </div>

                        <div className="floor-shadow-3d" />

                        <div className="chip-3d chip-1-3d">
                            <div className="chip-lbl-3d">Crescimento</div>
                            <div className="chip-row-3d">
                                <div className="chip-dot-3d" style={{ background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                                <div className="chip-val-3d">+24.6%</div>
                            </div>
                        </div>
                        <div className="chip-3d chip-2-3d">
                            <div className="chip-lbl-3d">Usuários ativos</div>
                            <div className="chip-row-3d">
                                <div className="chip-dot-3d" style={{ background: '#60a5fa', boxShadow: '0 0 8px #60a5fa' }} />
                                <div className="chip-val-3d">8,492</div>
                            </div>
                        </div>
                        <div className="chip-3d chip-3-3d">
                            <div className="chip-lbl-3d">Conversão</div>
                            <div className="chip-row-3d">
                                <div className="chip-dot-3d" style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
                                <div className="chip-val-3d">78.3%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hint-3d">arraste para girar</div>
            </div>
        </div>
    );
};
