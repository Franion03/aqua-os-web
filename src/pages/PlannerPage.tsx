import { useState, useEffect } from 'react';
import { Calendar, Copy, Check, ExternalLink, RefreshCw, Clock, AlertCircle } from 'lucide-react';
import type { CalendarSeries } from '../types';

export default function PlannerPage() {
  const [series, setSeries] = useState<CalendarSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadSeries();
  }, []);

  async function loadSeries() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/calendar');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSeries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load calendar data');
    } finally {
      setLoading(false);
    }
  }

  function copyUrl(url: string, id: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  const activeCount = series.filter(s => s.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white font-display">Calendar</h2>
          <p className="text-sm text-slate-400 mt-1">
            Subscribe to auto-updating .ics calendars for matches, tournaments, and events
          </p>
        </div>
        <button
          onClick={loadSeries}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="glass p-4">
            <p className="text-xl font-bold text-white font-display">{series.length}</p>
            <p className="text-xs text-slate-400 mt-0.5">Calendar Sources</p>
          </div>
          <div className="glass p-4">
            <p className="text-xl font-bold text-emerald-400 font-display">{activeCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Active Polling</p>
          </div>
          <div className="glass p-4">
            <p className="text-xl font-bold text-amber-400 font-display">{series.length - activeCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Paused</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="glass p-8 text-center">
          <RefreshCw size={24} className="text-cyan-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading calendar sources…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="glass p-5 border border-red-900/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-red-400" />
            <p className="text-sm text-red-400 font-medium">Connection Error</p>
          </div>
          <p className="text-xs text-slate-400">
            Could not reach the calendar service ({error}). Make sure aqua-os-calendar is running on port 8082.
          </p>
        </div>
      )}

      {/* Series List */}
      {!loading && !error && series.length === 0 && (
        <div className="glass p-8 text-center">
          <Calendar size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No calendar sources configured yet.</p>
          <p className="text-xs text-slate-500 mt-1">
            Add a source via the admin panel to start generating .ics calendars.
          </p>
        </div>
      )}

      {!loading && !error && series.length > 0 && (
        <div className="space-y-3">
          {series.map(s => (
            <div key={s.id} className="glass overflow-hidden">
              <div className="px-5 py-4 flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-white truncate">{s.name}</h3>
                    {s.enabled ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-900/30 font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-950/50 text-amber-400 border border-amber-900/30 font-medium">
                        Paused
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                    {s.lastPolledAt ? (
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        Polled {new Date(s.lastPolledAt).toLocaleString()}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        Never polled
                      </span>
                    )}
                    {s.lastChangeAt && (
                      <span className="text-cyan-500">
                        · Updated {new Date(s.lastChangeAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => copyUrl(s.icsUrl, s.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-900/40 hover:bg-cyan-950/50 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                  >
                    {copiedId === s.id ? (
                      <>
                        <Check size={12} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy .ics URL
                      </>
                    )}
                  </button>
                  {s.googleCalendarUrl && (
                    <a
                      href={s.googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 hover:bg-emerald-950/50 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                    >
                      <ExternalLink size={12} /> Google Calendar
                    </a>
                  )}
                </div>
              </div>

              <div className="px-5 py-2 bg-slate-950/50 border-t border-slate-800/50 space-y-1">
                <code className="text-[11px] text-slate-500 break-all block">{s.icsUrl}</code>
                {s.googleCalendarUrl && (
                  <code className="text-[11px] text-slate-600 break-all block">{s.googleCalendarUrl}</code>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Setup Help */}
      {!loading && !error && series.length > 0 && (
        <div className="glass p-5">
          <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
            How to Subscribe
          </h4>
          <ol className="space-y-2 text-sm text-slate-300 list-decimal pl-4">
            <li>Click <strong className="text-cyan-400">Copy .ics URL</strong> on any calendar above</li>
            <li>Open your calendar app (Google, Apple, Outlook)</li>
            <li>Add a new calendar from URL and paste the link</li>
            <li>The calendar auto-updates when fixtures change</li>
          </ol>
          <a
            href="https://calendar.google.com/calendar/r/settings/addbyurl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 mt-3 transition-colors"
          >
            <ExternalLink size={12} /> Add to Google Calendar
          </a>
        </div>
      )}

      {/* Integration Note */}
      <div className="glass p-5 border border-slate-800">
        <div className="flex items-center gap-3">
          <Calendar size={20} className="text-cyan-400" />
          <div>
            <h3 className="text-sm font-semibold text-white">aqua-os-calendar service</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Polls configured sources, generates .ics files, and detects fixture changes automatically.
              Run with <code className="text-cyan-400 bg-slate-800 px-1 rounded">docker compose up aqua-os-calendar</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}