import { useState, useEffect, useRef } from "react";
import {
  Shield, Zap, Lock, Search, Briefcase, Star, CheckCircle,
  MessageSquare, Activity, TrendingUp, Clock, Menu, X,
  User, Mail, Phone, FileText, Send, LogIn, Hash, Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── типы модалок ─── */
type ModalType = null | "register" | "login" | "exchange" | "portfolio" | "messages" | "news" | "freelancer" | "client" | "write" | "admin" | "address";

const ADMIN_PASSWORD = "XXglavasaita11";

/* ─── фон + HUD (вынесен для переиспользования) ─── */
const SpaceCanvas = ({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) => (
  <>
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #4a76a8, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-6" style={{ background: "radial-gradient(circle, #1e5fa8, transparent 70%)", filter: "blur(50px)" }} />
    </div>
  </>
);

/* ─── обёртка модального окна ─── */
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ background: "rgba(2,4,8,0.85)", backdropFilter: "blur(8px)" }}>
    <div className="w-full max-w-md rounded-2xl border p-6 relative" style={{ background: "rgba(15,25,45,0.95)", borderColor: "rgba(74,118,168,0.35)", backdropFilter: "blur(20px)" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: "#8a8f9e" }}>
          <X className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ─── поле ввода ─── */
const Field = ({ label, placeholder, type = "text", icon }: { label: string; placeholder: string; type?: string; icon: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>{label}</label>
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(74,118,168,0.3)" }}>
      <span style={{ color: "#4a76a8" }}>{icon}</span>
      <input type={type} placeholder={placeholder} className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25" />
    </div>
  </div>
);

/* ─── карточка сообщения ─── */
const MsgCard = ({ avatar, name, color, role, msg, time }: { avatar: string; name: string; color: string; role: string; msg: string; time: string }) => (
  <div className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-sm font-bold shrink-0 relative`}>
      {avatar}
      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: "#5ecc8b", borderColor: "rgba(15,25,45,0.9)" }} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between">
        <span className="text-white text-sm font-semibold">{name}</span>
        <span className="text-xs" style={{ color: "#4a5060" }}>{time}</span>
      </div>
      <div className="text-xs" style={{ color: "#4a76a8" }}>{role}</div>
      <div className="text-xs mt-0.5 truncate" style={{ color: "#8a8f9e" }}>{msg}</div>
    </div>
  </div>
);

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [time, setTime] = useState(new Date());
  const [online, setOnline] = useState(1284);
  const [deals, setDeals] = useState(47);
  const [ping, setPing] = useState(12);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ─── редактируемые тексты ─── */
  const [texts, setTexts] = useState({
    heroTitle: "Фриланс без шума",
    heroAccent: "и спама",
    heroSub: "Биржа для серьёзных специалистов и надёжных заказчиков. Быстро, приватно, с защитой платежей.",
    heroBadge: "Закрытая платформа · только верифицированные участники",
    siteName: "FreelanceFW",
    siteTagline: "Закрытая биржа фриланса",
  });
  const [editDraft, setEditDraft] = useState({ ...texts });

  const open = (m: ModalType) => { setModal(m); setMobileMenuOpen(false); };
  const close = () => { setModal(null); setLoginPass(""); setLoginError(false); };

  const handleLogin = () => {
    if (loginPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      close();
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date());
      setOnline(p => p + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.7) setDeals(p => p + 1);
      setPing(Math.floor(Math.random() * 20) + 8);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2, a: Math.random(),
      da: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      speed: Math.random() * 0.08 + 0.01,
    }));
    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y += s.speed; s.a += s.da;
        if (s.y > canvas.height) s.y = 0;
        if (s.a < 0 || s.a > 1) s.da *= -1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${s.a})`; ctx.fill();
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

      <SpaceCanvas canvasRef={canvasRef} />

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
                <h1 className="text-base font-bold text-white leading-tight">{texts.siteName}</h1>
                <p className="text-xs" style={{ color: "#4a76a8" }}>{texts.siteTagline}</p>
                {isAdmin && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <button
                      onClick={() => open("admin")}
                      className="text-xs px-2 py-0.5 rounded font-semibold transition-all animate-pulse"
                      style={{ background: "rgba(255,180,0,0.15)", color: "#f0a030", border: "1px solid rgba(255,180,0,0.3)" }}
                    >
                      ⚙ Сайт
                    </button>
                    <button
                      onClick={() => open("address")}
                      className="text-xs px-2 py-0.5 rounded font-semibold transition-all"
                      style={{ background: "rgba(94,204,139,0.12)", color: "#5ecc8b", border: "1px solid rgba(94,204,139,0.3)" }}
                    >
                      🌐 Адрес
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Биржа", key: "exchange" as ModalType },
                { label: "Портфолио", key: "portfolio" as ModalType },
                { label: "Сообщения", key: "messages" as ModalType },
                { label: "Новости", key: "news" as ModalType },
              ].map(({ label, key }, i) => (
                <button key={label} onClick={() => open(key)}
                  className="px-4 py-1.5 rounded text-sm transition-colors"
                  style={{ color: i === 0 ? "#fff" : "#8a8f9e", background: i === 0 ? "#4a76a8" : "transparent" }}
                  onMouseEnter={e => { if (i !== 0) (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { if (i !== 0) (e.currentTarget as HTMLElement).style.color = "#8a8f9e"; }}
                >{label}</button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" className="text-white/60 hover:text-white text-sm px-3 border" style={{ borderColor: "rgba(74,118,168,0.4)" }} onClick={() => open("login")}>Войти</Button>
              <Button className="text-white text-sm px-4 border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }} onClick={() => open("register")}>Регистрация</Button>
            </div>
            <Button variant="ghost" className="sm:hidden text-white/60 p-2 border" style={{ borderColor: "rgba(74,118,168,0.3)" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t" style={{ borderColor: "rgba(74,118,168,0.2)" }}>
              <div className="flex flex-col gap-2 max-w-5xl mx-auto">
                {(["Биржа", "Портфолио", "Сообщения", "Новости"] as const).map((item, i) => {
                  const keys: ModalType[] = ["exchange", "portfolio", "messages", "news"];
                  return <button key={item} onClick={() => open(keys[i])} className="text-left px-3 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/5">{item}</button>;
                })}
                <div className="flex gap-2 pt-1">
                  <Button variant="ghost" className="flex-1 text-white/60 border text-sm" style={{ borderColor: "rgba(74,118,168,0.3)" }} onClick={() => open("login")}>Войти</Button>
                  <Button className="flex-1 text-white text-sm border-0" style={{ background: "#4a76a8" }} onClick={() => open("register")}>Регистрация</Button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Главный контент */}
        <main className="max-w-5xl mx-auto px-4 py-10 sm:py-16 space-y-8">

          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2" style={{ background: "rgba(74,118,168,0.15)", border: "1px solid rgba(74,118,168,0.35)", color: "#4a76a8" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
              {texts.heroBadge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              {texts.heroTitle}<br />
              <span style={{ color: "#4a76a8" }}>{texts.heroAccent}</span>
            </h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "#8a8f9e" }}>
              {texts.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button className="text-white px-8 py-3 text-sm font-semibold border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }} onClick={() => open("freelancer")}>
                <Briefcase className="w-4 h-4 mr-2" />
                Я фрилансер
              </Button>
              <Button variant="outline" className="border text-white/70 hover:bg-white/5 px-8 py-3 text-sm bg-transparent" style={{ borderColor: "rgba(74,118,168,0.4)" }} onClick={() => open("client")}>
                <Search className="w-4 h-4 mr-2" />
                Я ищу специалиста
              </Button>
            </div>
          </div>

          {/* Единая панель */}
          <div className="rounded-2xl overflow-hidden border" style={{ background: "rgba(15,25,45,0.65)", borderColor: "rgba(74,118,168,0.2)", backdropFilter: "blur(20px)" }}>

            {/* Специалист + чат */}
            <div className="p-6 border-b" style={{ borderColor: "rgba(74,118,168,0.15)" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#4a76a8" }}>Пример карточки специалиста</div>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="rounded-xl overflow-hidden w-full sm:w-64 border shrink-0" style={{ background: "rgba(10,20,40,0.6)", borderColor: "rgba(74,118,168,0.2)" }}>
                  <div className="h-14 relative my-0 py-0 px-0 mx-20" style={{ background: "linear-gradient(135deg, #4a76a8, #7c3aed)" }}>
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
                    <Button className="w-full text-white text-xs border-0 ring-1 ring-white/20 h-8" style={{ background: "#4a76a8" }} onClick={() => open("write")}>Написать сообщение</Button>
                  </div>
                </div>
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
                  { n: 1, title: "Зарегистрируйся", desc: "Заполни профиль и пройди верификацию", modal: "register" as ModalType },
                  { n: 2, title: "Найди проект", desc: "Фильтруй по бюджету и навыкам", modal: "exchange" as ModalType },
                  { n: 3, title: "Получи оплату", desc: "Защищённая сделка с эскроу", modal: "client" as ModalType },
                ].map(({ n, title, desc, modal: m }) => (
                  <div key={n} className="flex items-start gap-3 cursor-pointer group" onClick={() => open(m)}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0 transition-opacity group-hover:opacity-80" style={{ background: "#4a76a8" }}>{n}</div>
                    <div>
                      <div className="text-white font-medium text-sm group-hover:underline">{title}</div>
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

          {/* Онлайн */}
          <div className="rounded-2xl p-5 border" style={{ background: "rgba(15,25,45,0.55)", borderColor: "rgba(74,118,168,0.2)", backdropFilter: "blur(16px)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "#4a76a8" }}>Сейчас онлайн</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Мария", role: "Дизайнер", status: "Принимает заказы", avatar: "М", color: "from-purple-500 to-pink-500" },
                { name: "Сергей", role: "Заказчик", status: "Ищет разработчика", avatar: "С", color: "from-green-500 to-teal-500" },
                { name: "Иван", role: "Разработчик", status: "Выполняет проект", avatar: "И", color: "from-blue-500 to-indigo-500" },
                { name: "Анна", role: "Копирайтер", status: "Принимает заказы", avatar: "А", color: "from-orange-400 to-red-500" },
              ].map((u, i) => (
                <div key={i} onClick={() => open("write")} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
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

      {/* ══════════════ МОДАЛЬНЫЕ ОКНА ══════════════ */}

      {modal === "register" && (
        <Modal title="Регистрация" onClose={close}>
          <div className="space-y-3">
            <Field label="Имя и фамилия" placeholder="Иван Иванов" icon={<User className="w-4 h-4" />} />
            <Field label="Email" placeholder="ivan@example.com" type="email" icon={<Mail className="w-4 h-4" />} />
            <Field label="Телефон" placeholder="+7 900 000 00 00" type="tel" icon={<Phone className="w-4 h-4" />} />
            <Field label="Пароль" placeholder="Минимум 8 символов" type="password" icon={<Lock className="w-4 h-4" />} />
            <div className="flex gap-2 pt-1">
              <Button className="flex-1 text-white border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }} onClick={() => open("freelancer")}>
                <Briefcase className="w-4 h-4 mr-2" />Фрилансер
              </Button>
              <Button className="flex-1 text-white border-0 ring-1 ring-white/20" style={{ background: "#5a3a8a" }} onClick={() => open("client")}>
                <Search className="w-4 h-4 mr-2" />Заказчик
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {modal === "login" && (
        <Modal title="Вход в аккаунт" onClose={close}>
          <div className="space-y-3">
            <Field label="Email" placeholder="ivan@example.com" type="email" icon={<Mail className="w-4 h-4" />} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>Пароль</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border" style={{ background: "rgba(5,10,20,0.7)", borderColor: loginError ? "rgba(224,80,80,0.6)" : "rgba(74,118,168,0.3)" }}>
                <span style={{ color: "#4a76a8" }}><Lock className="w-4 h-4" /></span>
                <input
                  type="password"
                  placeholder="Ваш пароль"
                  value={loginPass}
                  onChange={e => { setLoginPass(e.target.value); setLoginError(false); }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
                />
              </div>
              {loginError && <p className="text-xs" style={{ color: "#e05050" }}>Неверный пароль</p>}
            </div>
            <Button className="w-full text-white border-0 ring-1 ring-white/20 mt-2" style={{ background: "#4a76a8" }} onClick={handleLogin}>
              <LogIn className="w-4 h-4 mr-2" />Войти
            </Button>
            <p className="text-center text-xs" style={{ color: "#8a8f9e" }}>
              Нет аккаунта?{" "}
              <button className="underline" style={{ color: "#4a76a8" }} onClick={() => open("register")}>Зарегистрироваться</button>
            </p>
          </div>
        </Modal>
      )}

      {modal === "admin" && (
        <Modal title="⚙ Управление сайтом" onClose={close}>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            <p className="text-xs" style={{ color: "#8a8f9e" }}>Панель создателя · редактируй тексты и сохраняй</p>

            {/* Быстрые действия */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Биржа", icon: "📋", action: () => open("exchange") },
                { label: "Сообщения", icon: "💬", action: () => open("messages") },
                { label: "Новости", icon: "📰", action: () => open("news") },
                { label: "Портфолио", icon: "🖼", action: () => open("portfolio") },
              ].map((item, i) => (
                <button key={i} onClick={() => { item.action(); }}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-left transition-colors hover:bg-white/5 text-sm text-white"
                  style={{ border: "1px solid rgba(74,118,168,0.2)" }}>
                  <span>{item.icon}</span>{item.label}
                </button>
              ))}
            </div>

            {/* Редактор текстов */}
            <div className="rounded-xl p-4 space-y-3" style={{ background: "rgba(5,10,20,0.5)", border: "1px solid rgba(74,118,168,0.2)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#f0a030" }}>✏️ Тексты главной страницы</p>

              {([
                { key: "siteName", label: "Название сайта" },
                { key: "siteTagline", label: "Подзаголовок под названием" },
                { key: "heroBadge", label: "Бейдж (строка над заголовком)" },
                { key: "heroTitle", label: "Главный заголовок" },
                { key: "heroAccent", label: "Акцентная строка (синяя)" },
                { key: "heroSub", label: "Описание под заголовком" },
              ] as { key: keyof typeof texts; label: string }[]).map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs" style={{ color: "#8a8f9e" }}>{label}</label>
                  <input
                    value={editDraft[key]}
                    onChange={e => setEditDraft(d => ({ ...d, [key]: e.target.value }))}
                    className="w-full bg-transparent text-sm text-white outline-none px-3 py-2 rounded-lg border placeholder:text-white/20"
                    style={{ borderColor: "rgba(74,118,168,0.3)", background: "rgba(5,10,20,0.6)" }}
                  />
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <Button className="flex-1 text-white border-0 ring-1 ring-white/20 text-sm" style={{ background: "#4a76a8" }}
                  onClick={() => { setTexts({ ...editDraft }); }}>
                  💾 Сохранить
                </Button>
                <Button variant="outline" className="text-white/50 border bg-transparent text-sm hover:bg-white/5"
                  style={{ borderColor: "rgba(74,118,168,0.3)" }}
                  onClick={() => setEditDraft({ ...texts })}>
                  Сбросить
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full border bg-transparent text-xs hover:bg-white/5"
              style={{ borderColor: "rgba(224,80,80,0.3)", color: "#e05050" }}
              onClick={() => { setIsAdmin(false); close(); }}>
              Выйти из режима создателя
            </Button>
          </div>
        </Modal>
      )}

      {modal === "address" && (
        <Modal title="🌐 Адрес сайта" onClose={close}>
          <div className="space-y-4">
            <p className="text-xs" style={{ color: "#8a8f9e" }}>Укажи новый адрес — сайт перенаправит на него посетителей</p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>Текущий адрес</label>
              <div className="px-3 py-2.5 rounded-lg border flex items-center gap-2" style={{ background: "rgba(5,10,20,0.5)", borderColor: "rgba(74,118,168,0.2)" }}>
                <span className="text-xs font-mono" style={{ color: "#5ecc8b" }}>{window.location.origin}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>Новый адрес (домен)</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(94,204,139,0.3)" }}>
                <span style={{ color: "#5ecc8b" }}>🌐</span>
                <input
                  id="new-address-input"
                  type="url"
                  placeholder="https://freelanceFW.ru"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25 font-mono"
                />
              </div>
            </div>
            <div className="rounded-xl p-3 text-xs space-y-1" style={{ background: "rgba(94,204,139,0.07)", border: "1px solid rgba(94,204,139,0.2)", color: "#8a8f9e" }}>
              <p>• Для смены домена перейди в <span style={{ color: "#5ecc8b" }}>Опубликовать → Привязать свой домен</span></p>
              <p>• После привязки SSL и хостинг настраиваются автоматически</p>
              <p>• Кнопка ниже откроет настройки публикации</p>
            </div>
            <Button
              className="w-full text-white border-0 ring-1 ring-white/20 text-sm"
              style={{ background: "#5ecc8b", color: "#0a1e0a" }}
              onClick={() => {
                const val = (document.getElementById("new-address-input") as HTMLInputElement)?.value;
                if (val) window.open(val, "_blank");
              }}
            >
              🌐 Перейти по новому адресу
            </Button>
          </div>
        </Modal>
      )}

      {modal === "freelancer" && (
        <Modal title="Анкета фрилансера" onClose={close}>
          <div className="space-y-3">
            <Field label="Имя и фамилия" placeholder="Иван Иванов" icon={<User className="w-4 h-4" />} />
            <Field label="Email" placeholder="ivan@example.com" type="email" icon={<Mail className="w-4 h-4" />} />
            <Field label="Специализация" placeholder="Например: UI/UX дизайн, разработка" icon={<Briefcase className="w-4 h-4" />} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>О себе</label>
              <div className="px-3 py-2.5 rounded-lg border" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(74,118,168,0.3)" }}>
                <textarea placeholder="Опыт работы, навыки, портфолио..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25 resize-none h-20" />
              </div>
            </div>
            <Field label="Ставка (₽/час)" placeholder="Например: 2000" icon={<TrendingUp className="w-4 h-4" />} />
            <Button className="w-full text-white border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }}>
              <Send className="w-4 h-4 mr-2" />Отправить анкету
            </Button>
          </div>
        </Modal>
      )}

      {modal === "client" && (
        <Modal title="Разместить заказ" onClose={close}>
          <div className="space-y-3">
            <Field label="Ваше имя" placeholder="Сергей Петров" icon={<User className="w-4 h-4" />} />
            <Field label="Email" placeholder="sergey@company.ru" type="email" icon={<Mail className="w-4 h-4" />} />
            <Field label="Название проекта" placeholder="Разработка сайта / Дизайн логотипа" icon={<FileText className="w-4 h-4" />} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>Описание задачи</label>
              <div className="px-3 py-2.5 rounded-lg border" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(74,118,168,0.3)" }}>
                <textarea placeholder="Подробно опишите задачу, сроки и требования..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25 resize-none h-20" />
              </div>
            </div>
            <Field label="Бюджет (₽)" placeholder="Например: 50 000" icon={<TrendingUp className="w-4 h-4" />} />
            <Button className="w-full text-white border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }}>
              <Send className="w-4 h-4 mr-2" />Разместить заказ
            </Button>
          </div>
        </Modal>
      )}

      {modal === "exchange" && (
        <Modal title="Биржа заказов" onClose={close}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border mb-3" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(74,118,168,0.3)" }}>
              <Search className="w-4 h-4" style={{ color: "#4a76a8" }} />
              <input className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25" placeholder="Поиск по навыкам..." />
            </div>
            {[
              { title: "Разработка лендинга", budget: "30 000 ₽", tag: "Веб", color: "from-blue-500 to-indigo-500" },
              { title: "UI/UX дизайн мобильного приложения", budget: "60 000 ₽", tag: "Дизайн", color: "from-purple-500 to-pink-500" },
              { title: "SEO-оптимизация сайта", budget: "15 000 ₽", tag: "Маркетинг", color: "from-green-500 to-teal-500" },
              { title: "Копирайтинг 20 статей", budget: "25 000 ₽", tag: "Текст", color: "from-orange-400 to-red-500" },
            ].map((j, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border hover:bg-white/5 cursor-pointer transition-colors" style={{ borderColor: "rgba(74,118,168,0.15)" }}>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${j.color} flex items-center justify-center shrink-0`}>
                  <Hash className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{j.title}</div>
                  <div className="text-xs" style={{ color: "#4a76a8" }}>{j.tag}</div>
                </div>
                <div className="text-sm font-semibold shrink-0" style={{ color: "#5ecc8b" }}>{j.budget}</div>
              </div>
            ))}
            <Button className="w-full text-white border-0 ring-1 ring-white/20 mt-2" style={{ background: "#4a76a8" }} onClick={() => open("client")}>
              + Разместить заказ
            </Button>
          </div>
        </Modal>
      )}

      {modal === "portfolio" && (
        <Modal title="Портфолио" onClose={close}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Мария К.", role: "UI/UX", works: 12, color: "from-purple-500 to-pink-500", avatar: "М" },
                { name: "Иван С.", role: "Разработчик", works: 28, color: "from-blue-500 to-indigo-500", avatar: "И" },
                { name: "Анна Р.", role: "Копирайтер", works: 45, color: "from-orange-400 to-red-500", avatar: "А" },
                { name: "Дмитрий Л.", role: "Маркетолог", works: 19, color: "from-green-500 to-teal-500", avatar: "Д" },
              ].map((p, i) => (
                <div key={i} className="p-3 rounded-xl border hover:bg-white/5 cursor-pointer transition-colors" style={{ borderColor: "rgba(74,118,168,0.15)" }}>
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-sm font-bold mb-2`}>{p.avatar}</div>
                  <div className="text-white text-sm font-semibold">{p.name}</div>
                  <div className="text-xs" style={{ color: "#4a76a8" }}>{p.role}</div>
                  <div className="text-xs mt-1" style={{ color: "#8a8f9e" }}>{p.works} работ</div>
                </div>
              ))}
            </div>
            <Button className="w-full text-white border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }} onClick={() => open("freelancer")}>
              Добавить своё портфолио
            </Button>
          </div>
        </Modal>
      )}

      {modal === "messages" && (
        <Modal title="Сообщения" onClose={close}>
          <div className="space-y-1">
            {[
              { avatar: "М", name: "Мария Коваль", color: "from-purple-500 to-pink-500", role: "Дизайнер", msg: "Готова обсудить детали проекта", time: "10:15" },
              { avatar: "С", name: "Сергей Петров", color: "from-green-500 to-teal-500", role: "Заказчик", msg: "Когда сможете приступить?", time: "09:40" },
              { avatar: "И", name: "Иван Смирнов", color: "from-blue-500 to-indigo-500", role: "Разработчик", msg: "Отправил правки по макету", time: "вчера" },
              { avatar: "А", name: "Анна Рябова", color: "from-orange-400 to-red-500", role: "Копирайтер", msg: "Статьи готовы, проверьте!", time: "вчера" },
            ].map((m, i) => <MsgCard key={i} {...m} />)}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border mt-2" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(74,118,168,0.3)" }}>
              <input className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25" placeholder="Написать сообщение..." />
              <button style={{ color: "#4a76a8" }}><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </Modal>
      )}

      {modal === "news" && (
        <Modal title="Новости платформы" onClose={close}>
          <div className="space-y-3">
            {[
              { icon: "🚀", title: "FreelanceFW 2.1 — новый релиз", desc: "Добавлена система эскроу, улучшен поиск по навыкам", date: "26 апр 2026" },
              { icon: "🔒", title: "Верификация по паспорту", desc: "Теперь все участники проходят обязательную верификацию", date: "20 апр 2026" },
              { icon: "💸", title: "Минимальная комиссия — 5%", desc: "Снизили комиссию для фрилансеров с рейтингом выше 4.5", date: "15 апр 2026" },
              { icon: "🌍", title: "Расширение на СНГ", desc: "Теперь принимаем участников из Казахстана и Беларуси", date: "10 апр 2026" },
            ].map((n, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl border hover:bg-white/5 transition-colors" style={{ borderColor: "rgba(74,118,168,0.15)" }}>
                <div className="text-2xl shrink-0">{n.icon}</div>
                <div>
                  <div className="text-white text-sm font-semibold">{n.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#8a8f9e" }}>{n.desc}</div>
                  <div className="text-xs mt-1" style={{ color: "#4a76a8" }}>{n.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal === "write" && (
        <Modal title="Написать сообщение" onClose={close}>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: "rgba(5,10,20,0.5)", borderColor: "rgba(74,118,168,0.2)" }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">М</div>
              <div>
                <div className="text-white font-semibold text-sm">Мария Коваль</div>
                <div className="text-xs flex items-center gap-1" style={{ color: "#5ecc8b" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />онлайн
                </div>
              </div>
            </div>
            <Field label="Тема" placeholder="Тема обращения" icon={<FileText className="w-4 h-4" />} />
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#8a8f9e" }}>Сообщение</label>
              <div className="px-3 py-2.5 rounded-lg border" style={{ background: "rgba(5,10,20,0.7)", borderColor: "rgba(74,118,168,0.3)" }}>
                <textarea placeholder="Опишите вашу задачу..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25 resize-none h-24" />
              </div>
            </div>
            <Button className="w-full text-white border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }}>
              <Send className="w-4 h-4 mr-2" />Отправить
            </Button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Index;