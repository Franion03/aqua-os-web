import { useState } from 'react';
import { Dumbbell, LayoutDashboard, CalendarDays, Menu, X } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import LevelsPage from './pages/LevelsPage';
import PlannerPage from './pages/PlannerPage';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'levels', label: 'Levels', icon: Dumbbell },
  { id: 'planner', label: 'Planner', icon: CalendarDays },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function App() {
  const [active, setActive] = useState<TabId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-800">
        <span className="text-cyan-400 font-bold text-lg font-display tracking-tight">AquaOS</span>
        <p className="text-xs text-slate-500 mt-0.5">Water Polo Club Manager</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActive(tab.id); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${active === tab.id
                ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-slate-800">
        <p className="text-[10px] text-slate-600 uppercase tracking-wider">v0.1.0 • OpenRouter</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Desktop Sidebar */}
      <aside className="sidebar-desktop fixed top-0 left-0 w-[260px] h-full border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl z-40">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="sidebar-mobile fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <span className="text-cyan-400 font-bold font-display">AquaOS</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-slate-400 p-2">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="sidebar-mobile fixed inset-0 z-30">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="fixed top-0 left-0 w-[260px] h-full border-r border-slate-800 bg-slate-950 z-40">
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="main-content p-4 md:p-6 pt-16 md:pt-6 max-w-6xl mx-auto">
        {active === 'dashboard' && <DashboardPage />}
        {active === 'levels' && <LevelsPage />}
        {active === 'planner' && <PlannerPage />}
      </main>
    </div>
  );
}
