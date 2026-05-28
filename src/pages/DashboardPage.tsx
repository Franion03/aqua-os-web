import { Dumbbell, Users, Trophy, Waves } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Training Levels', value: 7, icon: Dumbbell, color: 'text-cyan-400', bg: 'bg-cyan-950/30' },
    { label: 'Players', value: 5, icon: Users, color: 'text-purple-400', bg: 'bg-purple-950/30' },
    { label: 'Exercises', value: 0, icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-950/30' },
    { label: 'Crew Types', value: 5, icon: Waves, color: 'text-emerald-400', bg: 'bg-emerald-950/30' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white font-display">Dashboard</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="glass p-5">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon size={22} className={s.color} />
            </div>
            <p className="text-2xl font-bold text-white font-display">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="glass p-6">
        <h3 className="text-lg font-semibold text-white font-display mb-3">Welcome to AquaOS</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The agentic water polo club management system. Navigate to <strong className="text-cyan-400">Levels</strong> to 
          manage the 7-level SKB Waterpolo School training system, or use the <strong className="text-cyan-400">Planner</strong> to 
          integrate with Google Calendar for scheduling.
        </p>
      </div>
    </div>
  );
}
