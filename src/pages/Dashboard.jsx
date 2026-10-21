import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Video, Code2, CalendarDays, LifeBuoy, BarChart3, Briefcase,
  Building2, Trophy, ClipboardCheck, FileCheck2, BookOpen, ScanSearch,
  ShoppingBag, CalendarX2, Play, Pause, ArrowUpRight, Radio,
  Brain, Binary, MessageSquare, Atom, Sigma, Globe, Sparkles,
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

// Live modules shown in the moving strip. Swap this for real data later.
const liveModules = [
  { id: 'ai', subject: 'Elements of AI', topic: 'How machines learn', host: 'Live now', viewers: 128, icon: Brain, from: '#6D5BD0', to: '#E8743B' },
  { id: 'ds', subject: 'Data Structures', topic: 'Binary trees, step by step', host: 'Live now', viewers: 96, icon: Binary, from: '#2F6FED', to: '#7AA2FF' },
  { id: 'comm', subject: 'Communication Skills', topic: 'Pitching in 60 seconds', host: 'Starts 11:30', viewers: 54, icon: MessageSquare, from: '#D9467A', to: '#F2A36B' },
  { id: 'phy', subject: 'Physics', topic: 'Motion and forces', host: 'Live now', viewers: 77, icon: Atom, from: '#0F9AA8', to: '#6FD6C9' },
  { id: 'math', subject: 'Mathematics', topic: 'Probability in practice', host: 'Starts 2:00', viewers: 41, icon: Sigma, from: '#B2551F', to: '#F0B35A' },
  { id: 'web', subject: 'Web Development', topic: 'Layouts with Tailwind', host: 'Live now', viewers: 112, icon: Globe, from: '#5B3FA8', to: '#C86DD7' },
]

const pillTabs = [
  { label: 'Today', to: '/' },
  { label: 'Live', to: '/livebooks' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'Dojo', to: '/dojo' },
]

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

function Hero({ name, scheduleCount, playing, setPlaying, active }) {
  const current = liveModules[active]
  const next = liveModules[(active + 1) % liveModules.length]
  const firstName = name.split(' ')[0]

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cream/10 bg-olive-deep px-6 pb-40 pt-6 text-cream shadow-2xl md:px-12">
      {/* moving aurora background */}
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* pill nav */}
      <nav aria-label="Quick sections" className="relative z-10 mx-auto flex w-fit items-center gap-1 rounded-full border border-cream/15 bg-black/30 p-1 backdrop-blur">
        {pillTabs.map((t, i) => (
          <Link
            key={t.label}
            to={t.to}
            className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition ${
              i === 0 ? 'bg-cream text-ink' : 'text-cream/70 hover:text-cream'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="relative z-10 mt-14 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-sm font-medium tracking-wide text-sage">Welcome back, {firstName}</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-[1.02] md:text-7xl">
            Step into the
            <br />
            living classroom
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75">
            Live modules, today&apos;s schedule and every tool you use, in one calm place.
            Jump into a session that is running right now.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#live"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-white shadow-lg shadow-amber/30 transition hover:brightness-110"
            >
              <Radio size={16} aria-hidden="true" /> Explore live modules
            </a>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10"
            >
              <CalendarDays size={16} aria-hidden="true" /> Open schedule
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause live modules' : 'Play live modules'}
              aria-pressed={playing}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-cream ring-1 ring-cream/30 transition hover:bg-black/60"
            >
              {playing && <span className="halo absolute inset-0 rounded-full ring-1 ring-cream/40" aria-hidden="true" />}
              {playing ? <Pause size={20} /> : <Play size={20} className="translate-x-0.5" />}
            </button>
            <p className="text-sm text-cream/70">
              {playing ? 'Cycling through live modules' : 'Paused. Press play to resume'}
            </p>
          </div>
        </div>

        {/* floating cards */}
        <div className="relative mx-auto h-[390px] w-full max-w-md">
          <article key={current.id} className="float-in absolute left-0 top-0 w-64 rounded-3xl bg-paper p-2.5 text-ink shadow-2xl">
            <ModuleArt module={current} className="h-32 rounded-2xl" />
            <div className="px-2 pb-2 pt-3">
              <p className="flex items-center gap-1.5 text-xs font-medium text-moss">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
                </span>
                {current.host}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold leading-tight">{current.subject}</h2>
              <p className="mt-1 text-sm text-moss">{current.topic}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-moss">{current.viewers} learners</span>
                <Link
                  to="/livebooks"
                  aria-label={`Join ${current.subject}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream transition hover:bg-amber"
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </article>

          <article key={next.id} className="float-in-delayed absolute bottom-0 right-0 w-60 rounded-3xl bg-paper p-2.5 text-ink shadow-2xl">
            <div className="px-2 pt-2">
              <p className="text-xs font-medium uppercase tracking-widest text-moss">Up next</p>
              <h3 className="font-display text-xl font-semibold">{next.subject}</h3>
            </div>
            <ModuleArt module={next} className="mt-2 h-24 rounded-2xl" />
          </article>

          <div className="absolute right-2 top-6 text-right">
            <p className="text-xs text-cream/60">Classes today</p>
            <p className="font-display text-3xl font-semibold">{scheduleCount}</p>
          </div>
          <div className="absolute right-2 top-24 text-right">
            <p className="text-xs text-cream/60">Live modules</p>
            <p className="font-display text-3xl font-semibold">{liveModules.length}</p>
          </div>
        </div>
      </div>

      {/* layered hills along the bottom */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 110 C150 40 300 150 480 90 C650 30 800 140 980 80 C1080 50 1150 70 1200 60 L1200 160 L0 160Z" fill="#E8743B" opacity="0.18" />
        <path d="M0 130 C200 70 340 160 540 115 C720 75 880 150 1060 105 C1130 90 1170 100 1200 95 L1200 160 L0 160Z" fill="#6D5BD0" opacity="0.35" />
        <path d="M0 150 C220 110 380 160 600 135 C800 112 980 160 1200 130 L1200 160 L0 160Z" fill="#12142A" />
      </svg>
    </section>
  )
}

function LiveStrip({ playing }) {
  const loop = [...liveModules, ...liveModules]
  return (
    <section id="live" aria-labelledby="live-title" className="scroll-mt-6">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <h2 id="live-title" className="flex items-center gap-2 font-display text-3xl font-semibold text-cream">
            <Sparkles size={22} className="text-amber" aria-hidden="true" /> Live modules
          </h2>
          <p className="text-sm text-cream/65">Different subjects, running right now. Hover to pause.</p>
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
                className="group flex w-64 flex-col overflow-hidden rounded-2xl bg-paper text-ink shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <ModuleArt module={m} className="h-28" />
                <div className="p-4">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-amber">
                    <Radio size={12} aria-hidden="true" /> {m.host}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{m.subject}</h3>
                  <p className="text-sm text-moss">{m.topic}</p>
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
    <section className="rounded-2xl border border-concrete/40 bg-cream p-6 shadow-sm">
      <h2 className="font-display text-3xl font-semibold text-ink">My Day</h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sage/30 ring-1 ring-sage">
            <CalendarX2 size={44} strokeWidth={1.6} className="text-olive-deep" aria-hidden="true" />
          </div>
          <p className="mt-5 font-display text-2xl font-semibold text-ink">
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
              className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-amber bg-paper px-4 py-3 ring-1 ring-concrete/30"
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
    <div className="mx-auto max-w-7xl space-y-8">
      <Hero
        name={name}
        scheduleCount={schedule.length}
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
                className="group flex flex-col items-center gap-3 rounded-xl border border-concrete/40 bg-cream p-4 text-center transition duration-200 hover:-translate-y-0.5 hover:border-amber hover:shadow-md"
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
            className="flex items-center gap-4 rounded-xl border border-concrete/40 bg-cream p-5 transition duration-200 hover:-translate-y-0.5 hover:border-amber hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-white">
              <ShoppingBag size={24} strokeWidth={1.8} />
            </span>
            <span>
              <span className="block font-display text-xl font-semibold text-ink">Vibe Store</span>
              <span className="block text-sm text-moss">Browse and claim rewards</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
