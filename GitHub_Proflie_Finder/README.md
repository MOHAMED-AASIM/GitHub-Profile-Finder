# GitHub Profile Finder

React 19 + Vite 8 single-page app that searches public GitHub users (profile, stats, top 6 repos by stars),
with dark/light theme (saved in localStorage), side-by-side comparison, skeleton loading and 404 / rate-limit / network error states.
No backend, no API key (GitHub unauthenticated limit: 60 requests/hour per IP).

    npm install
    npm run dev      # development
    npm run build    # production build in dist/
