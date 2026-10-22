import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Video, Code2, CalendarDays, LifeBuoy, BarChart3, Briefcase,
  Building2, Trophy, ClipboardCheck, FileCheck2, BookOpen, ScanSearch,
  ShoppingBag, CalendarX2, Play, Pause, ArrowUpRight, Radio,
  Brain, Binary, MessageSquare, Atom, Sigma, Globe, Sparkles,
  Home, Search, Mic, ArrowUp, Plus, ChevronDown, CheckCircle2,
} from 'lucide-react'
import WelcomeHeader from '../components/WelcomeHeader'

const quickLinks = [
  { name: 'Livebooks', to: '/livebooks', icon: Video },
  { name: 'Dojo', to: '/dojo', icon: Code2 },
  { name: 'Schedule', to: '/schedule', icon: CalendarDays },
  { name: 'Kalvium Support', to: '/support', icon: LifeBuoy },
  { name: 'Markers', to: '/markers', icon: BarChart3 },
  { name: 'My Internships', to: '/internships', icon: Briefcase },
  { name: 'Placement Drives', to: '/placements', icon: Building2 },
  { name: 'Showcase', to: '/showcase', icon: Trophy },
  { name: 'Attendance Hub', to: '/attendance', icon: ClipboardCheck },
  { name: 'Assessment Corner', to: '/assessments', icon: FileCheck2 },
  { name: 'Info Center', to: '/info', icon: BookOpen },
  { name: 'Project Assessor', to: '/project-assessor', icon: ScanSearch },
]

const sampleSchedule = [
  { id: 1, time: '9:20 AM - 10:10 AM', subject: 'Elements of AI', room: 'Lab 2' },
  { id: 2, time: '10:15 AM - 11:05 AM', subject: 'Data Structures', room: 'Room 12' },
  { id: 3, time: '11:30 AM - 12:20 PM', subject: 'Communication Skills', room: 'Room 8' },
]

// Live modules shown in the hero and the moving strip. Swap this for real data later.
const liveModules = [
  { id: 'ai', subject: 'Elements of AI', topic: 'How machines learn', host: 'Live now', viewers: 128, icon: Brain, from: '#6D5BD0', to: '#E8743B' },
  { id: 'ds', subject: 'Data Structures', topic: 'Binary trees, step by step', host: 'Live now', viewers: 96, icon: Binary, from: '#2F6FED', to: '#7AA2FF' },
  { id: 'comm', subject: 'Communication Skills', topic: 'Pitching in 60 seconds', host: 'Starts 11:30', viewers: 54, icon: MessageSquare, from: '#D9467A', to: '#F2A36B' },
  { id: 'phy', subject: 'Physics', topic: 'Motion and forces', host: 'Live now', viewers: 77, icon: Atom, from: '#0F9AA8', to: '#6FD6C9' },
  { id: 'math', subject: 'Mathematics', topic: 'Probability in practice', host: 'Starts 2:00', viewers: 41, icon: Sigma, from: '#B2551F', to: '#F0B35A' },
  { id: 'web', subject: 'Web Development', topic: 'Layouts with Tailwind', host: 'Live now', viewers: 112, icon: Globe, from: '#5B3FA8', to: '#C86DD7' },
]

const askChips = [
  { label: 'Plan my day', to: '/schedule' },
  { label: 'Join a live module', to: '/livebooks' },
  { label: 'Practice in the Dojo', to: '/dojo' },
  { label: 'Check my markers', to: '/markers' },
]

const previewTabs = [
  { label: 'Home', to: '/', icon: Home, active: true },
  { label: 'Live', to: '/livebooks', icon: Radio },
  { label: 'Schedule', to: '/schedule', icon: CalendarDays },
]

// Frosted card used inside the sky-blue preview window.
const glass = 'rounded-2xl border border-white/70 bg-white/55 p-4 backdrop-blur-sm'

function ModuleArt({ module: m, className = '' }) {
  const Icon = m.icon
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
    >
      <span className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl" />
      <span className="absolute -bottom-8 right-2 h-28 w-28 rounded-full bg-black/20 blur-2xl" />
      <Icon size={44} strokeWidth={1.4} className="relative text-white/95" aria-hidden="true" />
    </div>
  )
}

function Hero({ name, schedule, playing, setPlaying, active }) {
  const current = liveModules[active]
  const firstName = name.split(' ')[0]
  const upcoming = [1, 2, 3].map((n) => liveModules[(active + n) % liveModules.length])
  const learnersLive = liveModules.reduce((sum, m) => sum + m.viewers, 0)

  return (
    <section aria-labelledby="hero-title">
      {/* headline */}
      <div className="mx-auto max-w-3xl px-2 pb-10 pt-10 text-center md:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium text-moss">
          <Sparkles size={14} className="text-amber" aria-hidden="true" /> Welcome back, {firstName}
        </p>
        <h1
          id="hero-title"
          className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight text-ink md:text-7xl"
        >
          Your classroom, running on its own.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/60">
          Live modules, today&apos;s schedule and every tool you use, together in one calm place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#live"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-medium text-white transition hover:bg-ink/85"
          >
            <Radio size={16} aria-hidden="true" /> Explore live modules
          </a>
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-base font-medium text-ink transition hover:bg-black/[0.03]"
          >
            <CalendarDays size={16} aria-hidden="true" /> Open schedule
          </Link>
        </div>
      </div>

      {/* app preview window */}
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(40,70,140,0.35)]">
        <div className="flex h-11 items-center gap-2 px-5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>

        <div
          className="relative overflow-hidden p-3 md:p-4"
          style={{
            backgroundColor: '#A9C7F5',
            backgroundImage:
              'radial-gradient(40rem 18rem at 15% 0%, rgba(255,255,255,0.75), transparent 60%),' +
              'radial-gradient(34rem 16rem at 90% 40%, rgba(255,255,255,0.55), transparent 60%),' +
              'radial-gradient(40rem 20rem at 40% 105%, rgba(255,255,255,0.7), transparent 60%),' +
              'linear-gradient(180deg, #8DB4F2 0%, #C9DBF8 100%)',
          }}
        >
          {/* preview top bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-full border border-white/70 bg-white/50 px-3 py-2 backdrop-blur-sm">
            <span className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-xs font-semibold text-white">Z</span>
              Zylios
              <ChevronDown size={14} className="text-ink/50" aria-hidden="true" />
            </span>

            <nav aria-label="Preview sections" className="flex items-center gap-1">
              {previewTabs.map(({ label, to, icon: Icon, active: isActive }) => (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? 'bg-white text-ink shadow-sm' : 'text-ink/65 hover:bg-white/60'
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 text-ink/70">
              <Search size={17} className="mx-2" aria-hidden="true" />
              <Link to="/support" className="rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-ink">
                Support
              </Link>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)]">
            {/* assistant panel */}
            <div className={`${glass} flex min-h-[420px] flex-col lg:min-h-[560px]`}>
              <div className="flex items-center gap-2 border-b border-white/70 pb-3 text-sm font-medium text-ink">
                <Sparkles size={15} className="text-amber" aria-hidden="true" />
                Today with Zylios
              </div>

              <div className="flex flex-1 items-center justify-center px-2 py-8 text-center">
                <p className="text-2xl font-medium tracking-tight text-ink">What should I work on?</p>
              </div>

              <ul className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {askChips.map((c) => (
                  <li key={c.label} className="shrink-0">
                    <Link
                      to={c.to}
                      className="block rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-sm text-ink/80 transition hover:bg-white"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                to="/dojo"
                className="flex flex-col gap-6 rounded-2xl bg-white px-4 py-3 shadow-sm"
                aria-label="Ask for help in the Dojo"
              >
                <span className="text-base text-ink/40">Ask Zylios for a hint…</span>
                <span className="flex items-center justify-between text-ink/60">
                  <Plus size={18} aria-hidden="true" />
                  <span className="flex items-center gap-3">
                    <Mic size={17} aria-hidden="true" />
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white">
                      <ArrowUp size={16} aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </Link>
            </div>

            {/* dashboard cards */}
            <div className="grid content-start gap-3">
              <div className={`${glass} flex items-center justify-between gap-3`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-amber shadow-sm">
                    <Sparkles size={20} aria-hidden="true" />
                  </span>
                  <p className="text-lg font-medium text-ink">I&apos;m here when you need me.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pause live modules' : 'Play live modules'}
                  aria-pressed={playing}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-white/80"
                >
                  {playing ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
                </button>
              </div>

              {/* featured live module */}
              <div className={glass}>
                <div className="flex items-center justify-between border-b border-white/70 pb-2 text-sm font-medium text-ink">
                  <span>Live right now</span>
                  <Link to="/livebooks" className="text-ink/50 hover:text-ink" aria-label="See all live modules">
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
                <article key={current.id} className="float-in mt-3 flex items-center gap-4">
                  <ModuleArt module={current} className="h-20 w-28 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                      </span>
                      {current.host} · {current.viewers} learners
                    </p>
                    <h2 className="mt-1 truncate text-xl font-semibold text-ink">{current.subject}</h2>
                    <p className="truncate text-sm text-ink/60">{current.topic}</p>
                  </div>
                  <Link
                    to="/livebooks"
                    aria-label={`Join ${current.subject}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition hover:bg-amber"
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </article>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {/* today's classes */}
                <div className={glass}>
                  <div className="flex items-center justify-between border-b border-white/70 pb-2 text-sm font-medium text-ink">
                    <span>Your day</span>
                    <Link to="/schedule" className="text-ink/50 hover:text-ink" aria-label="Open schedule">
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <p className="mt-3 text-sm text-ink/70">
                    {schedule.length} {schedule.length === 1 ? 'class' : 'classes'} today
                  </p>
                  {schedule.length === 0 ? (
                    <p className="mt-3 flex items-center gap-2 text-sm text-ink/60">
                      <CalendarX2 size={16} aria-hidden="true" /> Nothing is planned yet.
                    </p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {schedule.slice(0, 3).map((c, i) => (
                        <li
                          key={c.id}
                          className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm text-ink"
                        >
                          <CheckCircle2
                            size={16}
                            aria-hidden="true"
                            className={i === 0 ? 'text-emerald-600' : 'text-ink/25'}
                          />
                          <span className="truncate">{c.subject}</span>
                          <span className="ml-auto shrink-0 text-xs text-ink/50">{c.time.split(' - ')[0]}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* coming up */}
                <div className={glass}>
                  <div className="flex items-center justify-between border-b border-white/70 pb-2 text-sm font-medium text-ink">
                    <span>Coming up</span>
                    <Link to="/livebooks" className="text-ink/50 hover:text-ink" aria-label="See all live modules">
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {upcoming.map((m) => {
                      const Icon = m.icon
                      return (
                        <li key={m.id} className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm text-ink">
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white"
                            style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
                          >
                            <Icon size={13} aria-hidden="true" />
                          </span>
                          <span className="truncate">{m.subject}</span>
                          <span className="ml-auto shrink-0 text-xs text-ink/50">{m.host}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {/* quick numbers */}
              <div className={glass}>
                <div className="border-b border-white/70 pb-2 text-sm font-medium text-ink">At a glance</div>
                <dl className="mt-3 grid grid-cols-3 divide-x divide-white/80 text-sm">
                  <div className="pr-3">
                    <dt className="text-ink/55">Classes today</dt>
                    <dd className="mt-1 text-2xl font-semibold text-ink">{schedule.length}</dd>
                  </div>
                  <div className="px-3">
                    <dt className="text-ink/55">Live modules</dt>
                    <dd className="mt-1 text-2xl font-semibold text-ink">{liveModules.length}</dd>
                  </div>
                  <div className="pl-3">
                    <dt className="text-ink/55">Learners live</dt>
                    <dd className="mt-1 text-2xl font-semibold text-ink">{learnersLive}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveStrip({ playing }) {
  const loop = [...liveModules, ...liveModules]
  return (
    <section id="live" aria-labelledby="live-title" className="scroll-mt-24">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <h2 id="live-title" className="flex items-center gap-2 text-3xl font-semibold tracking-tight text-ink">
            <Sparkles size={22} className="text-amber" aria-hidden="true" /> Live modules
          </h2>
          <p className="text-sm text-ink/60">Different subjects, running right now. Hover to pause.</p>
        </div>
        <Link to="/livebooks" className="text-sm font-medium text-amber hover:underline">See all</Link>
      </div>

      <div className="marquee overflow-hidden rounded-2xl">
        <ul
          className="marquee-track flex w-max gap-4 py-2"
          style={{ animationPlayState: playing ? 'running' : 'paused' }}
        >
          {loop.map((m, i) => (
            <li key={`${m.id}-${i}`} aria-hidden={i >= liveModules.length ? 'true' : undefined}>
              <Link
                to="/livebooks"
                tabIndex={i >= liveModules.length ? -1 : 0}
                className="group flex w-64 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white text-ink shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ModuleArt module={m} className="h-28" />
                <div className="p-4">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-amber">
                    <Radio size={12} aria-hidden="true" /> {m.host}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{m.subject}</h3>
                  <p className="text-sm text-ink/60">{m.topic}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function MyDay({ items }) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-semibold tracking-tight text-ink">My Day</h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sage/30 ring-1 ring-sage">
            <CalendarX2 size={44} strokeWidth={1.6} className="text-olive-deep" aria-hidden="true" />
          </div>
          <p className="mt-5 text-2xl font-semibold text-ink">
            Looks like nothing is planned
          </p>
          <p className="mt-1 max-w-xs text-sm text-moss">
            Classes and sessions for today will show up here.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-amber bg-paper px-4 py-3 ring-1 ring-black/5"
            >
              <div>
                <p className="text-sm font-medium text-moss">{c.time}</p>
                <p className="mt-0.5 text-base font-semibold text-ink">{c.subject}</p>
              </div>
              {c.room && (
                <span className="rounded-md bg-sage/30 px-2.5 py-1 text-sm font-medium text-olive-deep">
                  {c.room}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function Dashboard({
  name = 'Kunwar Jayaadittya Singh',
  schedule = sampleSchedule, // pass [] to see the empty state
  editableBrand = true,
}) {
  const [playing, setPlaying] = useState(true)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setActive((i) => (i + 1) % liveModules.length), 4500)
    return () => clearInterval(id)
  }, [playing])

  return (
    <div className="mx-auto max-w-7xl space-y-14">
      <Hero
        name={name}
        schedule={schedule}
        playing={playing}
        setPlaying={setPlaying}
        active={active}
      />

      <LiveStrip playing={playing} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Left column */}
        <div className="space-y-6">
          <WelcomeHeader name={name} editable={editableBrand} />
          <MyDay items={schedule} />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickLinks.map(({ name: label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className="group flex flex-col items-center gap-3 rounded-xl border border-black/5 bg-white p-4 text-center transition duration-200 hover:-translate-y-0.5 hover:border-amber hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage text-olive-deep transition group-hover:bg-amber group-hover:text-white">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </Link>
            ))}
          </div>

          <Link
            to="/vibe-store"
            className="flex items-center gap-4 rounded-xl border border-black/5 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-amber hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-white">
              <ShoppingBag size={24} strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-xl font-semibold text-ink">Vibe Store</span>
              <span className="block text-sm text-moss">Browse and claim rewards</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}