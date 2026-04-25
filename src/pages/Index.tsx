import { useState } from "react";
import {
  Shield,
  Zap,
  Lock,
  ArrowRight,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: "linear-gradient(135deg, #0f1f3d 0%, #0d2d2a 50%, #0a1f1a 100%)" }}>
      {/* Навигация */}
      <nav className="border-b border-white/10 px-4 sm:px-6 py-4" style={{ background: "rgba(10, 20, 40, 0.85)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">FreelanceHub</h1>
              <p className="text-xs hidden sm:block" style={{ color: "#6ee7b7" }}>Закрытая платформа для фрилансеров</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40">
              Войти
            </Button>
            <Button className="text-white px-6 py-2 rounded text-sm font-medium border-0 ring-1 ring-white/30" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
              Начать работу
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-white/70 hover:text-white hover:bg-white/10 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 justify-start border border-white/20">
                Войти
              </Button>
              <Button className="text-white px-6 py-2 rounded text-sm font-medium ring-1 ring-white/30 border-0" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                Начать работу
              </Button>
            </div>
          </div>
        )}
      </nav>

      <div className="flex min-h-screen">
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] flex-col items-center py-3 gap-2" style={{ background: "rgba(5, 15, 30, 0.7)" }}>
          <div className="w-12 h-12 rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}></div>
          {["🔥", "💼", "⭐", "🔒"].map((emoji, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer text-lg"
              style={{ background: "rgba(255,255,255,0.07)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #10b981)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            >
              {emoji}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
          <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 flex flex-col`} style={{ background: "rgba(8, 18, 35, 0.8)" }}>
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">FreelanceHub</h2>
              <Button
                variant="ghost"
                className="lg:hidden text-white/50 hover:text-white hover:bg-white/10 p-1 border border-white/10 hover:border-white/30"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-2">
              <div className="mb-4">
                <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6ee7b7" }}>
                  <ArrowRight className="w-3 h-3" />
                  <span>Разделы</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["биржа-заказов", "мои-проекты", "портфолио", "поддержка"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-white/50 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6ee7b7" }}>
                  <ArrowRight className="w-3 h-3" />
                  <span>Общение</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["Нетворкинг", "Обзор работ"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-white/50 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      <Mic className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-2 flex items-center gap-2" style={{ background: "rgba(5, 12, 25, 0.9)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                <span className="text-white text-sm font-medium">А</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">Алексей</div>
                <div className="text-xs truncate" style={{ color: "#10b981" }}>● В сети</div>
              </div>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-white/10 border border-white/10 hover:border-white/30">
                <Settings className="w-4 h-4 text-white/50" />
              </Button>
            </div>
          </div>

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2" style={{ background: "rgba(10, 20, 40, 0.6)" }}>
              <Button
                variant="ghost"
                className="lg:hidden text-white/50 hover:text-white hover:bg-white/10 p-1 mr-2 border border-white/10 hover:border-white/30"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Hash className="w-5 h-5 text-white/40" />
              <span className="text-white font-semibold">биржа-заказов</span>
              <div className="w-px h-6 bg-white/20 mx-2 hidden sm:block"></div>
              <span className="text-white/40 text-sm hidden sm:block">Только проверенные заказчики и исполнители</span>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 cursor-pointer hover:text-white transition-colors" />
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 cursor-pointer hover:text-white transition-colors" />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto">

              {/* Приветствие */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">FreelanceHub</span>
                    <span className="text-white text-xs px-1 rounded" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>ПЛАТФОРМА</span>
                    <span className="text-white/30 text-xs hidden sm:inline">Сегодня в 10:00</span>
                  </div>
                  <div className="text-white/80 text-sm sm:text-base">
                    <p className="mb-3 sm:mb-4">
                      <strong>Добро пожаловать в FreelanceHub!</strong> Закрытая платформа для серьёзных специалистов и надёжных заказчиков. Никакого спама — только реальные проекты.
                    </p>
                    <div className="rounded p-3 sm:p-4" style={{ background: "rgba(255,255,255,0.05)", borderLeft: "4px solid #10b981" }}>
                      <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Почему FreelanceHub:</h3>
                      <ul className="space-y-1 text-xs sm:text-sm text-white/60">
                        <li>✓ Только верифицированные участники</li>
                        <li>✓ Безопасные сделки с защитой платежей</li>
                        <li>✓ Удобный чат и управление задачами</li>
                        <li>✓ Быстрый поиск по навыкам и бюджету</li>
                        <li>✓ Приватность и конфиденциальность данных</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение фрилансера */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">М</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Мария · Дизайнер</span>
                    <span className="text-white/30 text-xs hidden sm:inline">Сегодня в 10:15</span>
                  </div>
                  <div className="text-white/80 mb-3 text-sm sm:text-base">
                    Выложила новый проект в портфолио — редизайн мобильного приложения за 2 недели 🔥
                  </div>

                  {/* Карточка проекта */}
                  <div className="rounded-lg overflow-hidden w-full max-w-sm border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-16 sm:h-20 relative flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                      <span className="text-white text-2xl sm:text-3xl font-bold opacity-30">UX</span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">М</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold">Мария Коваль</div>
                          <div className="text-white/50 text-xs flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>4.9 · 47 проектов</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-white/60 text-xs sm:text-sm mb-3">UI/UX дизайн · Figma · Прототипирование</div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }}></div>
                        <span className="text-xs font-medium" style={{ color: "#10b981" }}>Доступна для новых проектов</span>
                      </div>
                      <Button className="w-full text-white text-xs sm:text-sm py-1.5 rounded border-0 ring-1 ring-white/30" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                        Написать
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение заказчика */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">С</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Сергей · Заказчик</span>
                    <span className="text-white/30 text-xs hidden sm:inline">Сегодня в 10:22</span>
                  </div>
                  <div className="text-white/80 text-sm sm:text-base">
                    Нашёл разработчика за 20 минут — платформа реально работает 👍
                  </div>
                </div>
              </div>

              {/* Начало работы */}
              <div className="rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#10b981" }} />
                  Начни работать на FreelanceHub
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {[
                    { n: 1, title: "Зарегистрируйся", desc: "Заполни профиль и пройди быструю верификацию" },
                    { n: 2, title: "Найди проект", desc: "Фильтруй по бюджету, срокам и навыкам" },
                    { n: 3, title: "Получи оплату", desc: "Безопасная сделка с защитой для обеих сторон" },
                  ].map(({ n, title, desc }) => (
                    <div key={n} className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                        <span className="text-white font-bold text-sm sm:text-base">{n}</span>
                      </div>
                      <h3 className="text-white font-medium mb-2 text-sm sm:text-base">{title}</h3>
                      <p className="text-white/50 text-xs sm:text-sm">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="text-white px-6 sm:px-8 py-2 sm:py-3 rounded text-sm font-medium border-0 ring-1 ring-white/30" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Я фрилансер
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-white/25 text-white/70 hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-2 sm:py-3 rounded text-sm font-medium bg-transparent"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Я ищу специалиста
                  </Button>
                </div>
              </div>

              {/* Преимущества */}
              <div className="rounded-lg p-4 sm:p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Почему FreelanceHub?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Закрытая платформа", desc: "Только верифицированные участники — никакого спама" },
                    { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Быстрый старт", desc: "Первый проект можно найти за несколько часов" },
                    { icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Защита платежей", desc: "Деньги на эскроу до сдачи работы" },
                    { icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />, title: "Удобное общение", desc: "Чат, задачи и документы в одном месте" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-white/5 transition-colors">
                      <div className="mt-0.5" style={{ color: "#10b981" }}>{feature.icon}</div>
                      <div>
                        <div className="text-white font-medium text-xs sm:text-sm">{feature.title}</div>
                        <div className="text-white/50 text-xs sm:text-sm">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Поле ввода */}
            <div className="p-2 sm:p-4">
              <div className="rounded-lg px-3 sm:px-4 py-2 sm:py-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="text-white/30 text-xs sm:text-sm">Сообщение #биржа-заказов</div>
              </div>
            </div>
          </div>

          {/* Боковая панель участников */}
          <div className="hidden xl:block w-60 p-4" style={{ background: "rgba(8, 18, 35, 0.8)" }}>
            <div className="mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#6ee7b7" }}>В сети — 4</h3>
              <div className="space-y-2">
                {[
                  { name: "Мария · Дизайнер", status: "Принимает заказы", avatar: "М", color: "from-purple-500 to-pink-500" },
                  { name: "Сергей · Заказчик", status: "Ищет разработчика", avatar: "С", color: "from-green-500 to-blue-500" },
                  { name: "Иван · Разработчик", status: "Выполняет проект", avatar: "И", color: "from-blue-500 to-purple-500" },
                  { name: "Анна · Копирайтер", status: "Принимает заказы", avatar: "А", color: "from-orange-500 to-red-500" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
                    <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative`}>
                      <span className="text-white text-sm font-medium">{user.avatar}</span>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 rounded-full" style={{ background: "#10b981", borderColor: "transparent" }}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{user.name}</div>
                      <div className="text-white/40 text-xs truncate">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;