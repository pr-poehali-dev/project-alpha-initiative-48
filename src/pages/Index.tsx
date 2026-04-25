import { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  Lock,
  Hash,
  Users,
  Mic,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Briefcase,
  Star,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [online, setOnline] = useState(1284);
  const [deals, setDeals] = useState(47);
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setOnline(prev => prev + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.7) setDeals(prev => prev + 1);
      setPing(Math.floor(Math.random() * 20) + 8);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: "#1a1b1e" }}>

      {/* HUD — динамичная панель статуса */}
      <div className="w-full px-4 py-1.5 flex items-center gap-4 sm:gap-8 text-xs overflow-x-auto" style={{ background: "#0d0e10", borderBottom: "1px solid #2d5a8e33" }}>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4a76a8" }}></div>
          <span style={{ color: "#4a76a8" }}>FreelanceFW</span>
          <span className="text-white/20">v2.1</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Activity className="w-3 h-3" style={{ color: "#5ecc8b" }} />
          <span className="text-white/40">онлайн:</span>
          <span style={{ color: "#5ecc8b" }} className="font-mono">{online.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <TrendingUp className="w-3 h-3" style={{ color: "#f0a030" }} />
          <span className="text-white/40">сделок сегодня:</span>
          <span style={{ color: "#f0a030" }} className="font-mono">{deals}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: ping < 20 ? "#5ecc8b" : "#e05050" }}></div>
          <span className="text-white/40">ping:</span>
          <span className="font-mono" style={{ color: ping < 20 ? "#5ecc8b" : "#e05050" }}>{ping}ms</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <Clock className="w-3 h-3 text-white/30" />
          <span className="font-mono text-white/50">{timeStr}</span>
        </div>
      </div>

      {/* Навигация в стиле ВК */}
      <nav className="border-b px-4 sm:px-6 py-3" style={{ background: "#1f2025", borderColor: "#2a2b30" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: "#4a76a8" }}>
              FW
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">FreelanceFW</h1>
              <p className="text-xs" style={{ color: "#4a76a8" }}>Закрытая биржа фриланса</p>
            </div>
          </div>

          {/* Центральное меню — десктоп */}
          <div className="hidden md:flex items-center gap-1">
            {["Биржа", "Портфолио", "Сообщения", "Новости"].map((item, i) => (
              <button
                key={item}
                className="px-4 py-2 rounded text-sm transition-colors"
                style={{
                  color: i === 0 ? "#fff" : "#8a8f9e",
                  background: i === 0 ? "#4a76a8" : "transparent",
                }}
                onMouseEnter={e => { if (i !== 0) e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { if (i !== 0) e.currentTarget.style.color = "#8a8f9e"; }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {/* Поиск */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded text-sm" style={{ background: "#2a2b30", border: "1px solid #3a3b42" }}>
              <Search className="w-3.5 h-3.5 text-white/30" />
              <span className="text-white/30 text-xs">Найти специалиста...</span>
            </div>
            <Button variant="ghost" className="text-white/60 hover:text-white text-sm px-3 border" style={{ borderColor: "#3a3b42" }}>
              Войти
            </Button>
            <Button className="text-white text-sm px-4 border-0 ring-1 ring-white/20" style={{ background: "#4a76a8" }}>
              Регистрация
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-white/60 p-2 border"
            style={{ borderColor: "#3a3b42" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t" style={{ borderColor: "#2a2b30" }}>
            <div className="flex flex-col gap-2">
              {["Биржа", "Портфолио", "Сообщения"].map(item => (
                <button key={item} className="text-left px-3 py-2 rounded text-sm text-white/60 hover:text-white hover:bg-white/5">{item}</button>
              ))}
              <div className="flex gap-2 pt-1">
                <Button variant="ghost" className="flex-1 text-white/60 border text-sm" style={{ borderColor: "#3a3b42" }}>Войти</Button>
                <Button className="flex-1 text-white text-sm border-0" style={{ background: "#4a76a8" }}>Регистрация</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="flex" style={{ minHeight: "calc(100vh - 88px)" }}>

        {/* Левая боковая панель — стиль ВК */}
        <div className="hidden lg:flex w-[72px] flex-col items-center py-3 gap-2" style={{ background: "#16171a", borderRight: "1px solid #2a2b30" }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xs cursor-pointer" style={{ background: "#4a76a8" }}>
            FW
          </div>
          <div className="w-6 h-px" style={{ background: "#2a2b30" }}></div>
          {["A", "B", "C", "D"].map((letter, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer text-sm font-semibold transition-all"
              style={{ background: "#1f2025", color: "#8a8f9e", border: "1px solid #2a2b30" }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#4a76a8";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#4a76a8";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#1f2025";
                e.currentTarget.style.color = "#8a8f9e";
                e.currentTarget.style.borderColor = "#2a2b30";
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">

          {/* Боковая панель меню */}
          <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-56 flex-shrink-0`} style={{ background: "#1a1b1e", borderRight: "1px solid #2a2b30" }}>
            <div className="p-3 border-b" style={{ borderColor: "#2a2b30" }}>
              <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#4a76a8" }}>Разделы</div>
              {[
                { icon: <Hash className="w-4 h-4" />, label: "биржа-заказов", active: true },
                { icon: <Hash className="w-4 h-4" />, label: "мои-проекты" },
                { icon: <Hash className="w-4 h-4" />, label: "портфолио" },
                { icon: <Hash className="w-4 h-4" />, label: "поддержка" },
              ].map(({ icon, label, active }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer mb-0.5 transition-colors"
                  style={{
                    background: active ? "#4a76a820" : "transparent",
                    color: active ? "#fff" : "#8a8f9e",
                    borderLeft: active ? "2px solid #4a76a8" : "2px solid transparent",
                  }}
                >
                  {icon}
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="p-3">
              <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#4a76a8" }}>Общение</div>
              {["Нетворкинг", "Обзор работ"].map(label => (
                <div key={label} className="flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer mb-0.5 text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                  <Mic className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Пользователь */}
            <div className="absolute bottom-0 w-56 p-3 flex items-center gap-2 border-t" style={{ background: "#16171a", borderColor: "#2a2b30" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ background: "#4a76a8" }}>А</div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">Алексей</div>
                <div className="text-xs" style={{ color: "#5ecc8b" }}>● онлайн</div>
              </div>
              <Button variant="ghost" size="sm" className="w-7 h-7 p-0 border" style={{ borderColor: "#3a3b42" }}>
                <Settings className="w-3.5 h-3.5 text-white/40" />
              </Button>
            </div>
          </div>

          {/* Основная область */}
          <div className="flex-1 flex flex-col">

            {/* Топбар чата */}
            <div className="h-11 flex items-center px-4 gap-2 border-b" style={{ background: "#1f2025", borderColor: "#2a2b30" }}>
              <Button
                variant="ghost"
                className="lg:hidden p-1 mr-1 border text-white/50"
                style={{ borderColor: "#3a3b42" }}
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <Hash className="w-4 h-4" style={{ color: "#4a76a8" }} />
              <span className="text-white font-semibold text-sm">биржа-заказов</span>
              <div className="w-px h-4 mx-2" style={{ background: "#3a3b42" }}></div>
              <span className="text-xs hidden sm:block" style={{ color: "#8a8f9e" }}>Только проверенные участники</span>
              <div className="ml-auto flex items-center gap-3">
                <Bell className="w-4 h-4 cursor-pointer hover:text-white transition-colors" style={{ color: "#8a8f9e" }} />
                <Users className="w-4 h-4 cursor-pointer hover:text-white transition-colors" style={{ color: "#8a8f9e" }} />
                <Search className="w-4 h-4 cursor-pointer hover:text-white transition-colors" style={{ color: "#8a8f9e" }} />
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-5">

              {/* Системное сообщение */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: "#4a76a8" }}>FW</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">FreelanceFW</span>
                    <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ background: "#4a76a820", color: "#4a76a8", border: "1px solid #4a76a840" }}>система</span>
                    <span className="text-xs" style={{ color: "#8a8f9e" }}>сегодня в 10:00</span>
                  </div>
                  <div className="text-sm" style={{ color: "#d0d3de" }}>
                    <p className="mb-3">
                      <strong className="text-white">Добро пожаловать в FreelanceFW!</strong> Закрытая платформа для серьёзных специалистов и надёжных заказчиков. Никакого спама — только реальные проекты.
                    </p>
                    <div className="rounded-lg p-3 text-sm" style={{ background: "#1f2025", borderLeft: "3px solid #4a76a8" }}>
                      <div className="font-semibold text-white mb-2">Возможности платформы:</div>
                      <ul className="space-y-1" style={{ color: "#8a8f9e" }}>
                        <li>✓ Только верифицированные участники</li>
                        <li>✓ Безопасные сделки с эскроу-оплатой</li>
                        <li>✓ Встроенный чат и трекинг задач</li>
                        <li>✓ Умный поиск по навыкам и бюджету</li>
                        <li>✓ Полная конфиденциальность данных</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение фрилансера */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold shrink-0">М</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">Мария · Дизайнер</span>
                    <span className="text-xs" style={{ color: "#8a8f9e" }}>сегодня в 10:15</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "#d0d3de" }}>Выложила новый проект — редизайн мобильного приложения за 2 недели 🔥</p>

                  {/* Карточка специалиста — стиль ВК */}
                  <div className="rounded-xl overflow-hidden max-w-xs border" style={{ background: "#1f2025", borderColor: "#2a2b30" }}>
                    <div className="h-14 relative" style={{ background: "linear-gradient(135deg, #4a76a8, #7c3aed)" }}>
                      <div className="absolute bottom-0 translate-y-1/2 left-4">
                        <div className="w-14 h-14 rounded-full border-4 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold" style={{ borderColor: "#1f2025" }}>М</div>
                      </div>
                    </div>
                    <div className="pt-10 px-4 pb-4">
                      <div className="font-semibold text-white">Мария Коваль</div>
                      <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "#8a8f9e" }}>
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>4.9 · 47 проектов · UI/UX</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5ecc8b" }}></div>
                        <span className="text-xs" style={{ color: "#5ecc8b" }}>Принимает заказы</span>
                      </div>
                      <Button className="w-full text-white text-xs border-0 ring-1 ring-white/20 h-8" style={{ background: "#4a76a8" }}>
                        Написать сообщение
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение заказчика */}
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-sm font-semibold shrink-0">С</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">Сергей · Заказчик</span>
                    <span className="text-xs" style={{ color: "#8a8f9e" }}>сегодня в 10:22</span>
                  </div>
                  <p className="text-sm" style={{ color: "#d0d3de" }}>Нашёл разработчика за 20 минут — платформа реально работает 👍</p>
                </div>
              </div>

              {/* Секция регистрации */}
              <div className="rounded-xl p-5 border" style={{ background: "#1f2025", borderColor: "#2a2b30" }}>
                <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{ color: "#4a76a8" }} />
                  Начни работать на FreelanceFW
                </h2>
                <p className="text-sm mb-5" style={{ color: "#8a8f9e" }}>3 шага до первого заказа</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
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

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="text-white border-0 ring-1 ring-white/20 sm:flex-1" style={{ background: "#4a76a8" }}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Я фрилансер
                  </Button>
                  <Button variant="outline" className="border text-white/70 hover:bg-white/5 sm:flex-1 bg-transparent" style={{ borderColor: "#3a3b42" }}>
                    <Search className="w-4 h-4 mr-2" />
                    Я ищу специалиста
                  </Button>
                </div>
              </div>

              {/* Преимущества */}
              <div className="rounded-xl p-5 border" style={{ background: "#1f2025", borderColor: "#2a2b30" }}>
                <h3 className="text-base font-bold text-white mb-4">Почему FreelanceFW?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: <Lock className="w-4 h-4" />, title: "Закрытая платформа", desc: "Только верифицированные участники" },
                    { icon: <Zap className="w-4 h-4" />, title: "Быстрый старт", desc: "Первый заказ — за несколько часов" },
                    { icon: <Shield className="w-4 h-4" />, title: "Защита платежей", desc: "Деньги на эскроу до сдачи работы" },
                    { icon: <MessageSquare className="w-4 h-4" />, title: "Удобное общение", desc: "Чат, задачи и файлы в одном месте" },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
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

            {/* Поле ввода */}
            <div className="p-3 border-t" style={{ borderColor: "#2a2b30", background: "#1a1b1e" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg" style={{ background: "#1f2025", border: "1px solid #3a3b42" }}>
                <span className="text-sm flex-1" style={{ color: "#8a8f9e" }}>Написать в #биржа-заказов...</span>
                <ArrowRight className="w-4 h-4" style={{ color: "#4a76a8" }} />
              </div>
            </div>
          </div>

          {/* Правая панель участников */}
          <div className="hidden xl:block w-56 border-l p-3" style={{ background: "#1a1b1e", borderColor: "#2a2b30" }}>
            <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#4a76a8" }}>Онлайн — 4</div>
            <div className="space-y-1">
              {[
                { name: "Мария · Дизайнер", status: "Принимает заказы", avatar: "М", color: "from-purple-500 to-pink-500" },
                { name: "Сергей · Заказчик", status: "Ищет разработчика", avatar: "С", color: "from-green-500 to-teal-500" },
                { name: "Иван · Разработчик", status: "Выполняет проект", avatar: "И", color: "from-blue-500 to-indigo-500" },
                { name: "Анна · Копирайтер", status: "Принимает заказы", avatar: "А", color: "from-orange-400 to-red-500" },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <div className={`w-8 h-8 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center text-sm font-semibold relative shrink-0`}>
                    {user.avatar}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1b1e]" style={{ background: "#5ecc8b" }}></div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-xs font-medium truncate">{user.name}</div>
                    <div className="text-xs truncate" style={{ color: "#8a8f9e" }}>{user.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
