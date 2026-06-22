# 🌊 aqua-os-web

React frontend for water polo club management — dashboards, training levels, and session planning.

## Architecture

TypeScript SPA built with Vite, React, and Tailwind CSS. Proxies API calls to the backend service.

```
src/
  pages/
    DashboardPage    → club overview
    LevelsPage       → training level browser
    PlannerPage      → session planner
  components/
    ExerciseForm     → exercise creation form
```

## Prerequisites

- Node.js 18+
- npm

## Run Locally

```bash
npm install
npm run dev
```

App starts on **http://localhost:5173** — proxies `/api` to `localhost:8080`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL (if not using proxy) | `/api` |

## Docker

```bash
docker build -t aqua-os-web .
docker run -p 80:80 aqua-os-web
```

Production uses nginx to serve static files and reverse-proxy API requests.

## Related Repos

| Repo | Description |
|------|-------------|
| [aqua-os-backend](../aqua-os-backend) | Go REST API |
| [aqua-os-crew](../aqua-os-crew) | AI agents (CrewAI) |
| [aqua-os-calendar](../aqua-os-calendar) | Game calendar service |
| [aqua-os-infrastructure](../aqua-os-infrastructure) | Terraform AWS infra |

## License

GPL-3.0
