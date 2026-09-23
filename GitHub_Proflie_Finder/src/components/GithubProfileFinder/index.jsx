import { useEffect, useState } from 'react'
import { UserCard, Skeleton, ErrorBox } from './user'
import './styles.css'

const API = 'https://api.github.com/users/'
const FEATURED = [
  { name: 'MOHAMED-AASIM', label: 'Product builder', image: 'https://github.com/MOHAMED-AASIM.png?size=400' },
  { name: 'mohaedafham2004', label: 'Developer', image: 'https://github.com/mohaedafham2004.png?size=400' },
  { name: 'Ilmaan-Ahamed', label: 'AI / ML engineer', image: 'https://github.com/Ilmaan-Ahamed.png?size=400' },
]

async function fetchUser(name) {
  let res
  try { res = await fetch(API + encodeURIComponent(name)) }
  catch { throw { type: 'network' } }
  if (res.status === 404) throw { type: 'notfound', name }
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get('x-ratelimit-reset')
    throw { type: 'rate', reset: reset ? new Date(reset * 1000) : null }
  }
  if (!res.ok) throw { type: 'network' }
  const user = await res.json()
  let repos = []
  try {
    const r = await fetch(`${API}${encodeURIComponent(name)}/repos?per_page=100`)
    if (r.ok) repos = await r.json()
    else if (r.status === 403) throw { type: 'rate' }
  } catch (e) { if (e.type === 'rate') throw e; throw { type: 'network' } }
  const top = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)
  return { user, repos: top }
}

export default function GithubProfileFinder() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' } })
  const [compare, setCompare] = useState(false)
  const [names, setNames] = useState(['', ''])
  const [results, setResults] = useState([null, null])
  const [hint, setHint] = useState('')
  const [sort, setSort] = useState('stars')
  const [language, setLanguage] = useState('all')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const load = async (i, name) => {
    setResults(r => r.map((x, j) => (j === i ? { status: 'loading' } : x)))
    let out
    try { out = { status: 'ok', ...(await fetchUser(name)) } }
    catch (e) { out = { status: 'error', error: e, name } }
    setResults(r => r.map((x, j) => (j === i ? out : x)))
  }

  const submit = e => {
    e.preventDefault()
    const list = names.slice(0, compare ? 2 : 1).map(n => n.trim())
    if (!list.some(Boolean)) return setHint('Enter a GitHub username to search.')
    setHint('')
    setResults([null, null])
    list.forEach((n, i) => n && load(i, n))
  }

  const setName = (i, v) => setNames(n => n.map((x, j) => (j === i ? v : x)))
  const shown = results.slice(0, compare ? 2 : 1)
  const selectProfile = name => {
    setName(0, name)
    setCompare(false)
    setHint('')
    setResults([null, null])
    load(0, name)
  }
  const exportResults = () => {
    const profiles = results.filter(r => r?.status === 'ok').map(r => ({ login: r.user.login, name: r.user.name, repos: r.user.public_repos, followers: r.user.followers, topRepositories: r.repos.map(repo => repo.name) }))
    if (!profiles.length) return setHint('Search a profile before exporting insights.')
    const blob = new Blob([JSON.stringify(profiles, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'profile-finder-insights.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="gpf">
      <header>
        <a className="brand" href="/" aria-label="GitHub Profile Finder home">
          <span className="brand-mark">GH</span>
          <span>Profile <b>Finder</b></span>
        </a>
        <button className="ghost" aria-label="Toggle theme" onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>
          <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span> {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow"><span /> DEVELOPER DIRECTORY</p>
          <h1>Find the people<br /><em>behind the code.</em></h1>
          <p className="intro-copy">Surface the signal in any GitHub profile. Compare momentum, community reach, and the work that matters.</p>
        </div>
        <div className="intro-card"><img src={FEATURED[0].image} alt="Abdul Saleem Mohamed Aasim" /><div><span>BUILT BY</span><strong>ABDUL SALEEM<br />MOHAMED AASIM</strong><a href="https://github.com/MOHAMED-AASIM" target="_blank" rel="noreferrer">@MOHAMED-AASIM ↗</a></div></div>
      </section>

      <form className="search glass" onSubmit={submit}>
        <div className="search-label"><span className="search-icon">⌕</span><span>Search profiles</span><small>GitHub handles only</small></div>
        <div className="inputs">
          <input value={names[0]} onChange={e => setName(0, e.target.value)} placeholder="e.g. torvalds" aria-label="GitHub username" autoFocus />
          {compare && <input value={names[1]} onChange={e => setName(1, e.target.value)} placeholder="e.g. octocat" aria-label="Second username" />}
        </div>
        <button type="submit" className="primary">Search <span aria-hidden="true">↗</span></button>
        <label className="toggle"><input type="checkbox" checked={compare} onChange={e => setCompare(e.target.checked)} /> <span>Compare mode</span></label>
      </form>
      {hint && <p className="hint">{hint}</p>}
      <div className="quick-start"><span>TRY A PROFILE</span>{FEATURED.map(profile => <button type="button" key={profile.name} onClick={() => selectProfile(profile.name)}>@{profile.name}</button>)}</div>

      <main className={compare ? 'grid two' : 'grid'}>
        {shown.some(Boolean) && <div className="results-heading"><p><span className="live-dot" /> RESULTS</p><div className="result-tools"><label>Language <select value={language} onChange={e => setLanguage(e.target.value)}><option value="all">All</option><option value="JavaScript">JavaScript</option><option value="Python">Python</option><option value="TypeScript">TypeScript</option></select></label><label>Sort <select value={sort} onChange={e => setSort(e.target.value)}><option value="stars">Most stars</option><option value="forks">Most forks</option></select></label><button className="export" onClick={exportResults}>Export JSON ↗</button></div></div>}
        {shown.map((r, i) => (
          <section key={i}>
            {!r ? (i === 0 && <p className="empty glass">Search a username to see their profile, stats and top repositories.</p>)
              : r.status === 'loading' ? <Skeleton />
              : r.status === 'error' ? <ErrorBox error={r.error} onRetry={() => load(i, names[i].trim())} />
              : <UserCard user={r.user} repos={r.repos.filter(repo => language === 'all' || repo.language === language).sort((a, b) => sort === 'forks' ? b.forks_count - a.forks_count : b.stargazers_count - a.stargazers_count)} />}
          </section>
        ))}
      </main>
    </div>
  )
}
