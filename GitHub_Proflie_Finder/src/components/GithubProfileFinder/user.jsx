const LANG = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219', HTML: '#e34c26',
  CSS: '#663399', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600', Go: '#00ADD8', Rust: '#dea584', PHP: '#4F5D95',
  Ruby: '#701516', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB', Shell: '#89e051', Vue: '#41b883' }
const langColor = l => LANG[l] || '#8b949e'
const fmt = d => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

export function UserCard({ user: u, repos }) {
  const site = u.blog && (u.blog.startsWith('http') ? u.blog : 'https://' + u.blog)
  return (
    <article className="card glass">
      <div className="head">
        <div className="ring"><img src={u.avatar_url} alt={`${u.login} avatar`} /></div>
        <div>
          <h2>{u.name || u.login}</h2>
          <a href={u.html_url} target="_blank" rel="noreferrer">@{u.login}</a>
          <p className="muted">Joined {fmt(u.created_at)}</p>
        </div>
      </div>
      {u.bio && <p className="bio">{u.bio}</p>}
      <ul className="meta">
        {u.location && <li>📍 {u.location}</li>}
        {u.company && <li>🏢 {u.company}</li>}
        {site && <li>🔗 <a href={site} target="_blank" rel="noreferrer">{u.blog}</a></li>}
        {u.twitter_username && <li>𝕏 <a href={`https://x.com/${u.twitter_username}`} target="_blank" rel="noreferrer">@{u.twitter_username}</a></li>}
      </ul>
      <div className="stats">
        {[['Repos', u.public_repos], ['Followers', u.followers], ['Following', u.following]].map(([k, v]) => (
          <div key={k}><strong>{v.toLocaleString()}</strong><span>{k}</span></div>
        ))}
      </div>
      <h3>Top repositories</h3>
      {repos.length === 0 ? <p className="muted">No public repositories.</p> : (
        <ul className="repos">
          {repos.map(r => (
            <li key={r.id}>
              <a href={r.html_url} target="_blank" rel="noreferrer" className="rname">{r.name}</a>
              {r.description && <p className="muted">{r.description}</p>}
              <div className="rmeta">
                <span>⭐ {r.stargazers_count}</span><span>🍴 {r.forks_count}</span><span>👁 {r.watchers_count}</span>
                {r.language && <span className="badge" style={{ '--c': langColor(r.language) }}>{r.language}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export function Skeleton() {
  return (
    <div className="card glass" aria-busy="true" aria-label="Loading profile">
      <div className="head"><div className="sk round" /><div className="grow"><div className="sk line" /><div className="sk line short" /></div></div>
      <div className="sk line" /><div className="sk line short" />
      <div className="stats">{[0, 1, 2].map(i => <div key={i} className="sk block" />)}</div>
      {[0, 1, 2].map(i => <div key={i} className="sk repo" />)}
    </div>
  )
}

export function ErrorBox({ error, onRetry }) {
  let msg
  if (error.type === 'notfound') msg = `User "${error.name}" was not found. Check the spelling and try another username.`
  else if (error.type === 'rate') msg = `GitHub's rate limit (60 requests/hour without sign-in) was reached.${error.reset ? ` Try again after ${error.reset.toLocaleTimeString()}.` : ' Please try again later.'}`
  else msg = 'Could not reach GitHub. Check your internet connection and try again.'
  return (
    <div className="err glass" role="alert">
      <p>⚠ {msg}</p>
      {error.type !== 'notfound' && <button className="primary" onClick={onRetry}>Retry</button>}
    </div>
  )
}
