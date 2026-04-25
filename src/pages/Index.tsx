import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Zap,
  Lock,
  Search,
  Briefcase,
  Star,
  CheckCircle,
  MessageSquare,
  Activity,
  TrendingUp,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [online, setOnline] = useState(1284);
  const [deals, setDeals] = useState(47);
  const [ping, setPing] = useState(12);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------- таймер ---------- */
  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date());
      setOnline(p => p + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.7) setDeals(p => p + 1);
      setPing(Math.floor(Math.random() * 20) + 8);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  /* ---------- звёзды ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      speed: Math.random() * 0.08 + 0.01,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y += s.speed;
        s.a += s.da;
        if (s.y > canvas.height) s.y = 0;
        if (s.a < 0 || s.a > 1) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${s.a})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ background: "radial-gradient(ellipse at 20% 30%, #0a1628 0%, #020408 50%, #050d18 100%)" }}>

      {/* Космический фон */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Туманности */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #4a76a8, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-6" style={{ background: "radial-gradient(circle, #1e5fa8, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* HUD */}
        <div className="w-full px-4 py-1.5 flex items-center gap-4 sm:gap-8 text-xs overflow-x-auto" style={{ background: "rgba(5,10,20,0.85)", borderBottom: "1px solid rgba(74,118,168,0.25)", backdropFilter: "blur(10px)" }}>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4a76a8" }} />
            <span style={{ color: "#4a76a8" }}>FreelanceFW</span>
            <span className="text-white/20">v2.1</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Activity className="w-3 h-3" style={{ color: "#5ecc8b" }} />
            <span className="text-white/40">онлайн:</span>
            <span className="font-mono" style={{ color: "#5ecc8b" }}>{online.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <TrendingUp className="w-3 h-3" style={{ color: "#f0a030" }} />
            <span className="text-white/40">сделок:</span>
            <span className="font-mono" style={{ color: "#f0a030" }}>{deals}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ping < 20 ? "#5ecc8b" : "#e05050" }} />
            <span className="text-white/40">ping:</span>
            <span className="font-mono" style={{ color: ping < 20 ? "#5ecc8b" : "#e05050" }}>{ping}ms</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            <Clock className="w-3 h-3 text-white/30" />
            <span className="font-mono text-white/50">{timeStr}</span>
          </div>
        </div>

        {/* Навигация */}
        <nav className="border-b px-4 sm:px-6 py-3" style={{ background: "rgba(15,25,45,0.75)", borderColor: "rgba(74,118,168,0.2)", backdropFilter: "blur(16px)" }}>
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: "#4a76a8" }}>FW</div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">FreelanceFW</h1>
                <p className="text-xs" style={{ color: "#4a76a8" }}>Закрытая биржа фриланса</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {["Биржа", "Портфолио", "Сообщения", "Новости"].map((item, i) => (
                <button key={item} className="px-4 py-1.5 rounded text-sm transition-colors"
                  style={{ color: i === 0 ? "#fff" : "#8a8f9e", background: i === 0 ? "#4a76a8" : "transparent" }}
                  onMouseEnter={e => { if (i !== 0) (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { if (i !== 0) (e.currentTarget as HTMLElement).style.color = "#8a8f9e"; }}
                >{item}</button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" className="text-white/60 hover:text-white text-sm px-3 border" style={{ borderColor: "rgba(74,118,168,0.4)" }}>Войти</Button>
              <Button className="text-white text-sm px-4 border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }}>Регистрация</Button>
            </div>
            <Button variant="ghost" className="sm:hidden text-white/60 p-2 border" style={{ borderColor: "rgba(74,118,168,0.3)" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t" style={{ borderColor: "rgba(74,118,168,0.2)" }}>
              <div className="flex flex-col gap-2 max-w-5xl mx-auto">
                {["Биржа", "Портфолио", "Сообщения"].map(item => (
                  <button key={item} className="text-left px-3 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/5">{item}</button>
                ))}
                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" className="flex-1 text-white/60 border text-sm" style={{ borderColor: "rgba(74,118,168,0.3)" }}>Войти</Button>
                  <Button className="flex-1 text-white text-sm border-0" style={{ background: "#4a76a8" }}>Регистрация</Button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Главный контент — единый блок */}
        <main className="max-w-5xl mx-auto px-4 py-10 sm:py-16 space-y-8">

          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2" style={{ background: "rgba(74,118,168,0.15)", border: "1px solid rgba(74,118,168,0.35)", color: "#4a76a8" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
              Закрытая платформа · только верифицированные участники
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              Фриланс без шума<br />
              <span style={{ color: "#4a76a8" }}>и спама</span>
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "#8a8f9e" }}>
              Биржа для серьёзных специалистов и надёжных заказчиков. Быстро, приватно, с защитой платежей.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button className="text-white px-8 py-3 text-sm font-semibold border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }}>
                <Briefcase className="w-4 h-4 mr-2" />
                Я фрилансер
              </Button>
              <Button variant="outline" className="border text-white/70 hover:bg-white/5 px-8 py-3 text-sm bg-transparent" style={{ borderColor: "rgba(74,118,168,0.4)" }}>
                <Search className="w-4 h-4 mr-2" />
                Я ищу специалиста
              </Button>
            </div>
          </div>

          {/* Единая панель */}
          <div className="rounded-2xl overflow-hidden border" style={{ background: "rgba(15,25,45,0.65)", borderColor: "rgba(74,118,168,0.2)", backdropFilter: "blur(20px)" }}>

            {/* Пример специалиста */}
            <div className="p-6 border-b" style={{ borderColor: "rgba(74,118,168,0.15)" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#4a76a8" }}>Пример карточки специалиста</div>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="rounded-xl overflow-hidden w-full sm:w-64 border shrink-0" style={{ background: "rgba(10,20,40,0.6)", borderColor: "rgba(74,118,168,0.2)" }}>
                  <div className="h-14 relative" style={{ background: "linear-gradient(135deg, #4a76a8, #7c3aed)" }}>
                    <div className="absolute bottom-0 translate-y-1/2 left-4">
                      <div className="w-14 h-14 rounded-full border-4 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold" style={{ borderColor: "rgba(15,25,45,0.9)" }}>М</div>
                    </div>
                  </div>
                  <div className="pt-10 px-4 pb-4">
                    <div className="font-semibold text-white">Мария Коваль</div>
                    <div className="flex items-center gap-1 text-xs mb-2" style={{ color: "#8a8f9e" }}>
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>4.9 · 47 проектов · UI/UX</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5ecc8b" }} />
                      <span className="text-xs" style={{ color: "#5ecc8b" }}>Принимает заказы</span>
                    </div>
                    <Button className="w-full text-white text-xs border-0 ring-1 ring-white/20 h-8" style={{ background: "#4a76a8" }}>Написать сообщение</Button>
                  </div>
                </div>

                {/* Чат-лента */}
                <div className="flex-1 space-y-3 text-sm">
                  {[
                    { avatar: "М", name: "Мария · Дизайнер", color: "from-purple-500 to-pink-500", text: "Выложила редизайн мобильного приложения — 2 недели работы 🔥", time: "10:15" },
                    { avatar: "С", name: "Сергей · Заказчик", color: "from-green-500 to-teal-500", text: "Нашёл разработчика за 20 минут — платформа работает 👍", time: "10:22" },
                    { avatar: "И", name: "Иван · Разработчик", color: "from-blue-500 to-indigo-500", text: "Закрыл 3 заказа за неделю. Рекомендую всем!", time: "10:35" },
                  ].map((m, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-sm font-semibold shrink-0`}>{m.avatar}</div>
                      <div>
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-white font-semibold text-xs">{m.name}</span>
                          <span className="text-xs" style={{ color: "#4a5060" }}>{m.time}</span>
                        </div>
                        <p style={{ color: "#c0c8d8" }}>{m.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Шаги */}
            <div className="p-6 border-b" style={{ borderColor: "rgba(74,118,168,0.15)" }}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4" style={{ color: "#4a76a8" }} />
                <span className="font-semibold text-white">Три шага до первого заказа</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { n: 1, title: "Зарегистрируйся", desc: "Заполни профиль и пройди верификацию" },
                  { n: 2, title: "Найди проект", desc: "Фильтруй по бюджету и навыкам" },
                  { n: 3, title: "Получи оплату", desc: "Защищённая сделка с эскроу" },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: "#4a76a8" }}>{n}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#8a8f9e" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Преимущества */}
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#4a76a8" }}>Почему FreelanceFW</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <Lock className="w-4 h-4" />, title: "Закрытая платформа", desc: "Только верифицированные участники — никакого спама" },
                  { icon: <Zap className="w-4 h-4" />, title: "Быстрый старт", desc: "Первый заказ можно найти за несколько часов" },
                  { icon: <Shield className="w-4 h-4" />, title: "Защита платежей", desc: "Деньги на эскроу до сдачи работы" },
                  { icon: <MessageSquare className="w-4 h-4" />, title: "Удобное общение", desc: "Чат, задачи и файлы в одном месте" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div style={{ color: "#4a76a8" }}>{f.icon}</div>
                    <div>
                      <div className="text-white font-medium text-sm">{f.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#8a8f9e" }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Онлайн участники */}
          <div className="rounded-2xl p-5 border" style={{ background: "rgba(15,25,45,0.55)", borderColor: "rgba(74,118,168,0.2)", backdropFilter: "blur(16px)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#4a76a8" }}>Сейчас онлайн</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Мария", role: "Дизайнер", status: "Принимает заказы", avatar: "М", color: "from-purple-500 to-pink-500" },
                { name: "Сергей", role: "Заказчик", status: "Ищет разработчика", avatar: "С", color: "from-green-500 to-teal-500" },
                { name: "Иван", role: "Разработчик", status: "Выполняет проект", avatar: "И", color: "from-blue-500 to-indigo-500" },
                { name: "Анна", role: "Копирайтер", status: "Принимает заказы", avatar: "А", color: "from-orange-400 to-red-500" },
              ].map((u, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-lg font-bold relative mb-2`}>
                    {u.avatar}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "#5ecc8b", borderColor: "rgba(15,25,45,0.9)" }} />
                  </div>
                  <div className="text-white text-sm font-semibold">{u.name}</div>
                  <div className="text-xs" style={{ color: "#4a76a8" }}>{u.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#8a8f9e" }}>{u.status}</div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Index;
