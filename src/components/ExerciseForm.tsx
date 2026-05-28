import { useState } from 'react';
import { Plus, Clock, Dumbbell, Save, X } from 'lucide-react';
import type { ExerciseCreate } from '../types';

const SKILLS = ['swimming','passing','catching','shooting','defense','conditioning','goalkeeping','tactics','ball_handling','general'];
const DIFFICULTIES = ['beginner','intermediate','advanced','elite'];

interface Props { levelId: number; levelName: string; onAdded: () => void; }

export default function ExerciseForm({ levelId, levelName, onAdded }: Props) {
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ExerciseCreate>({
    level_id: levelId, name: '', description: '', skill_category: 'general',
    difficulty: 'beginner', equipment: '', duration_minutes: 15, youtube_url: ''
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ ...form, name: '', description: '', equipment: '', youtube_url: '' });
    setSaving(false);
    setShow(false);
    onAdded();
  };

  return (
    <div className="mt-4">
      <button onClick={() => setShow(!show)}
        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 bg-cyan-950/30 border border-cyan-900/40 px-3 py-2 rounded-lg transition-colors">
        <Plus size={16} /> {show ? 'Cancel' : `Add Exercise to ${levelName}`}
      </button>

      {show && (
        <form onSubmit={submit} className="mt-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Name</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Skill</label>
              <select value={form.skill_category} onChange={e => setForm({...form, skill_category: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                {SKILLS.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider"><Clock size={12} className="inline mr-1" /> Duration (min)</label>
              <input type="number" value={form.duration_minutes} onChange={e => setForm({...form, duration_minutes: +e.target.value || 15})}
                min={1} max={120} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider"><Dumbbell size={12} className="inline mr-1" /> Equipment</label>
              <input value={form.equipment} onChange={e => setForm({...form, equipment: e.target.value})}
                placeholder="balls, cones, belts" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">YouTube URL</label>
              <input type="url" value={form.youtube_url} onChange={e => setForm({...form, youtube_url: e.target.value})}
                placeholder="https://youtube.com/watch?v=..." className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">Description</label>
              <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                rows={3} placeholder="Exercise setup, execution, coaching points..." className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none resize-none" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShow(false)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg"><X size={14} /> Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary"><Save size={14} /> {saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      )}
    </div>
  );
}
