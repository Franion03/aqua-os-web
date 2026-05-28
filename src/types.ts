export interface Level {
  id: number;
  name: string;
  description: string;
  order: number;
  skills: string;
  exercises?: Exercise[];
  created_at?: string;
  updated_at?: string;
}

export interface Exercise {
  id: number;
  level_id: number;
  name: string;
  description: string;
  skill_category: string;
  difficulty: string;
  equipment: string;
  duration_minutes: number;
  youtube_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExerciseCreate {
  level_id: number;
  name: string;
  description: string;
  skill_category: string;
  difficulty: string;
  equipment: string;
  duration_minutes: number;
  youtube_url: string;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  level: number;
}

// ── Calendar ─────────────────────────────────────────────────────

export interface CalendarSeries {
  id: string;
  name: string;
  icsUrl: string;
  googleCalendarUrl: string | null;
  enabled: boolean;
  lastPolledAt: string | null;
  lastChangeAt: string | null;
}
