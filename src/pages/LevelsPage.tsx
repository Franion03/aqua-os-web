import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Clock, Dumbbell, Trash2, Tag } from 'lucide-react';
import ExerciseForm from '../components/ExerciseForm';
import type { Level } from '../types';

export default function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLevels = async () => {
    try {
      const res = await fetch('/api/levels');
      const data = await res.json();
      setLevels(data.levels || []);
    } catch (e) {
      console.error('Failed to fetch levels', e);
    }
    setLoading(false);
  };

  const fetchDetail = async (id: number) => {
    try {
      const res = await fetch(`/api/levels/${id}`);
      const data = await res.json();
      setLevels(prev => prev.map(l => l.id === id ? { ...l, exercises: data.exercises || [] } : l));
    } catch (e) {
      console.error('Failed to fetch level detail', e);
    }
  };

  useEffect(() => { fetchLevels(); }, []);
  useEffect(() => {
    if (levels.length > 0 && expanded === null) setExpanded(levels[0].id);
  }, [levels]);

  const toggle = (id: number) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    fetchDetail(id);
  };

  const handleAdded = (id: number) => fetchDetail(id);

  if (loading) return <div className="text-slate-400 py-12 text-center">Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white font-display mb-6">
        SKB Waterpolo School — 7-Level System
      </h2>

      {levels.map(level => (
        <div key={level.id} className="glass overflow-hidden">
          {/* Header */}
          <button onClick={() => toggle(level.id)} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-800/30 transition-colors text-left">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 font-bold text-lg shrink-0">
              {level.order}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white font-display truncate">{level.name}</h3>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400 shrink-0">
              {level.exercises ? `${level.exercises.length} ex` : '...'}
            </span>
            {expanded === level.id ? <ChevronDown size={18} className="text-slate-500" /> : <ChevronRight size={18} className="text-slate-500" />}
          </button>

          {/* Skills — always visible */}
          <div className="px-5 pb-4 border-b border-slate-800/50">
            <ul className="space-y-1">
              {level.skills?.split('||').map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-cyan-500 mt-0.5 shrink-0">•</span>
                  <span>{skill.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expanded exercises */}
          {expanded === level.id && (
            <div className="px-5 py-4 bg-slate-950/30 space-y-4">
              <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Exercises</h4>
              {level.exercises && level.exercises.length > 0 ? (
                <div className="space-y-3">
                  {level.exercises.map(ex => (
                    <div key={ex.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-white">{ex.name}</h5>
                          <p className="text-xs text-slate-400 mt-1">{ex.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1"><Tag size={10} /> {ex.skill_category.replace(/_/g, ' ')}</span>
                            <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded capitalize">{ex.difficulty}</span>
                            {ex.duration_minutes > 0 && <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1"><Clock size={10} /> {ex.duration_minutes} min</span>}
                            {ex.equipment && <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1"><Dumbbell size={10} /> {ex.equipment}</span>}
                            {ex.youtube_url && (
                              <a href={ex.youtube_url} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] text-red-400 hover:text-red-300 bg-red-950/30 border border-red-900/30 px-2 py-0.5 rounded">
                                Watch Video
                              </a>
                            )}
                          </div>
                        </div>
                        <button onClick={async () => {
                          await fetch(`/api/exercises/${ex.id}`, { method: 'DELETE' });
                          handleAdded(level.id);
                        }} className="text-slate-600 hover:text-red-400 shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No exercises yet.</p>
              )}
              <ExerciseForm levelId={level.id} levelName={level.name} onAdded={() => handleAdded(level.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
