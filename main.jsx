import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Headphones, Heart, Menu,
  Music2, Play, Shuffle, Sparkles, X, Mail, Sun, Moon, Disc3, ExternalLink
} from 'lucide-react'
import './styles.css'

const originalTracks = [
  { title: 'Pink + White', artist: 'Frank Ocean' },
  { title: 'Ivy', artist: 'Frank Ocean' },
  { title: 'Thinkin Bout You', artist: 'Frank Ocean' },
  { title: 'Nights', artist: 'Frank Ocean' },
  { title: 'Self Control', artist: 'Frank Ocean' },
  { title: 'Teenage Fever', artist: 'Drake' },
  { title: 'Passionfruit', artist: 'Drake' },
  { title: 'Jungle', artist: 'Drake' },
  { title: 'Doing It Wrong', artist: 'Drake' },
  { title: 'Feel No Ways', artist: 'Drake' },
  { title: 'You Don’t Know My Name', artist: 'Alicia Keys' },
  { title: 'If I Ain’t Got You', artist: 'Alicia Keys' },
  { title: 'Un-thinkable (I’m Ready)', artist: 'Alicia Keys' },
  { title: 'Diary', artist: 'Alicia Keys' },
  { title: 'No One', artist: 'Alicia Keys' },
  { title: 'Japanese Denim', artist: 'Daniel Caesar' },
  { title: 'Best Part', artist: 'Daniel Caesar ft. H.E.R.' },
  { title: 'Focus', artist: 'H.E.R.' },
  { title: 'Get You', artist: 'Daniel Caesar ft. Kali Uchis' },
  { title: 'Snooze', artist: 'SZA' },
  { title: 'Essence', artist: 'Wizkid ft. Tems' },
  { title: 'Damage', artist: 'H.E.R.' },
  { title: 'Sweet Love', artist: 'Anita Baker' },
  { title: 'While We’re Young', artist: 'Jhené Aiko' },
  { title: 'Good Days', artist: 'SZA' },
]

const deluxeTracks = [
  { title: 'Seigfried', artist: 'Frank Ocean' },
  { title: 'White Ferrari', artist: 'Frank Ocean' },
  { title: 'Godspeed', artist: 'Frank Ocean' },
  { title: 'Lost', artist: 'Frank Ocean' },
  { title: 'Chanel', artist: 'Frank Ocean' },
  { title: 'Provider', artist: 'Frank Ocean' },
  { title: 'Swim Good', artist: 'Frank Ocean' },
  { title: 'Novacane', artist: 'Frank Ocean' },
  { title: 'Trust Issues', artist: 'Drake' },
  { title: 'Fire & Desire', artist: 'Drake' },
  { title: 'Not You Too', artist: 'Drake ft. Chris Brown' },
  { title: 'Teenage Fever', artist: 'Drake' },
  { title: 'From Time', artist: 'Drake ft. Jhené Aiko' },
  { title: 'Shot For Me', artist: 'Drake' },
  { title: 'Jungle', artist: 'Drake' },
  { title: 'Marvin’s Room', artist: 'Drake' },
  { title: 'Redemption', artist: 'Drake' },
  { title: 'The Real Her', artist: 'Drake ft. Lil Wayne & André 3000' },
  { title: 'A Woman’s Worth', artist: 'Alicia Keys' },
  { title: 'Unbreakable', artist: 'Alicia Keys' },
  { title: 'Like You’ll Never See Me Again', artist: 'Alicia Keys' },
  { title: 'Karma', artist: 'Alicia Keys' },
  { title: 'Try Sleeping with a Broken Heart', artist: 'Alicia Keys' },
  { title: 'Fallin’', artist: 'Alicia Keys' },
  { title: 'The Weekend', artist: 'SZA' },
]

const prompts = [
  'What song instantly puts you in a good mood?',
  'If you could teleport anywhere for a day, where would you go?',
  'What is one tiny thing that always makes your day better?',
  'Are you more of a spontaneous-plan person or a plan-everything person?',
  'What movie or series could you watch over and over?',
  'What is a random fact you will never forget?',
]

const quiz = [
  { q: 'Pick a perfect kind of afternoon.', a: ['A playlist and a slow walk', 'Trying somewhere new', 'A cosy film and snacks', 'A little bit of everything'] },
  { q: 'Choose a music mood.', a: ['R&B on repeat', 'A little indie moment', 'Old-school classics', 'Whatever feels right'] },
  { q: 'Your ideal mini adventure?', a: ['A cute café', 'A scenic drive', 'A bookshop wander', 'A spontaneous day out'] },
]

function App() {
  const [active, setActive] = useState('home')
  const [prompt, setPrompt] = useState(prompts[0])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('nvna-saved') || '[]'))
  const [playlistEdition, setPlaylistEdition] = useState('original')
  const [trackSearch, setTrackSearch] = useState('')

  const goTo = (id) => {
    setActive(id)
    setMobileMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleSaved = (title) => {
    const next = saved.includes(title) ? saved.filter(x => x !== title) : [...saved, title]
    setSaved(next)
    localStorage.setItem('nvna-saved', JSON.stringify(next))
  }

  const nextQuestion = (answer) => {
    const updated = [...answers, answer]
    setAnswers(updated)
    if (step === quiz.length - 1) setFinished(true)
    else setStep(step + 1)
  }

  const resetQuiz = () => { setStep(0); setAnswers([]); setFinished(false) }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => goTo('home')} aria-label="Go to home">NVNA<span>.</span></button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {['home', 'listening-room', 'little-things', 'the-quiz'].map((item) =>
            <button key={item} className={active === item ? 'nav-link active' : 'nav-link'} onClick={() => goTo(item)}>
              {item === 'listening-room' ? 'Listening room' : item === 'little-things' ? 'Little things' : item === 'the-quiz' ? 'The quiz' : 'Home'}
            </button>
          )}
        </nav>
        <button className="nav-cta" onClick={() => setNoteOpen(true)}>A little note <ArrowUpRight size={15}/></button>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button>
      </header>

      {mobileMenu && <div className="mobile-nav">
        {['home', 'listening-room', 'little-things', 'the-quiz'].map(item =>
          <button key={item} onClick={() => goTo(item)}>{item.replace('-', ' ')}</button>
        ))}
        <button onClick={() => { setNoteOpen(true); setMobileMenu(false) }}>A little note</button>
      </div>}

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line"/> A LITTLE CORNER OF THE INTERNET</div>
            <h1>The Nvna<br/><em>Experience.</em></h1>
            <p className="hero-sub">A few good sounds, curious questions, and little things worth discovering. Made to make you smile.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => goTo('listening-room')}>Take a look <ArrowDownRight size={17}/></button>
              <span className="tiny-note"><Sparkles size={14}/> No rules. Just explore.</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
            <div className="art-sun"/>
            <div className="art-card">
              <span className="art-label">CURRENTLY FEELING</span>
              <div className="art-title">A little<br/><i>inspired.</i></div>
              <div className="art-bottom"><span>VOL. 01</span><span>✳</span><span>MADE WITH CURIOSITY</span></div>
            </div>
            <div className="floating-sticker sticker-one"><Sparkles size={16}/></div>
            <div className="floating-sticker sticker-two">good<br/>energy</div>
          </div>
          <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></div>
        </section>

        <section className="intro-strip">
          <p>NOT A BIG PRODUCTION. <em>Just a small collection of nice things.</em></p>
          <span>01 — 04</span>
        </section>

        <section className="section-wrap listening-section" id="listening-room">
          <div className="section-heading">
            <div><div className="eyebrow">01 / SOUNDTRACK</div><h2>The listening<br/><em>room.</em></h2></div>
            <p className="section-desc">For the slow mornings, long rides, and moments when the right song just gets it.</p>
          </div>
          <div className="playlist-intro">
            <div><span className="pill">THE ORIGINAL MIX + DELUXE</span><h3>NVNA <em>TASTE.</em></h3><p>50 tracks for golden hours, long drives and everything in between.</p></div>
            <a className="spotify-link" href="https://open.spotify.com/search/NVNA%20TASTE" target="_blank" rel="noreferrer">Search on Spotify <ExternalLink size={14}/></a>
          </div>
          <div className="playlist-tabs">
            <button className={playlistEdition === 'original' ? 'edition-tab selected' : 'edition-tab'} onClick={() => setPlaylistEdition('original')}>Original · 25 tracks</button>
            <button className={playlistEdition === 'deluxe' ? 'edition-tab selected' : 'edition-tab'} onClick={() => setPlaylistEdition('deluxe')}>Deluxe · 25 tracks</button>
          </div>
          <div className="track-list full-track-list">
            <div className="track-list-heading"><span>{playlistEdition === 'original' ? 'THE ORIGINAL NVNA TASTE' : 'NVNA TASTE — DELUXE EDITION'}</span><span>{playlistEdition === 'original' ? '01—25' : '26—50'}</span></div>
            {(playlistEdition === 'original' ? originalTracks : deluxeTracks)
              .filter(track => `${track.title} ${track.artist}`.toLowerCase().includes(trackSearch.toLowerCase()))
              .map((track, i) => <div className="track-row" key={`${playlistEdition}-${i}-${track.title}`}>
                <span className="track-num">{String(i+1).padStart(2, '0')}</span><div className="track-info"><strong>{track.title}</strong><span>{track.artist}</span></div>
                <button className={saved.includes(track.title) ? 'save-track saved' : 'save-track'} onClick={() => toggleSaved(track.title)} aria-label="Save track"><Heart size={17} fill={saved.includes(track.title) ? 'currentColor' : 'none'}/></button>
                <button className="play-track" onClick={() => window.open('https://open.spotify.com/search/' + encodeURIComponent(`${track.title} ${track.artist}`), '_blank')} aria-label={`Find ${track.title} on Spotify`}><Play size={14} fill="currentColor"/></button>
              </div>)}
            <div className="playlist-tools"><input aria-label="Search tracks" placeholder="Find a song or artist..." value={trackSearch} onChange={e => setTrackSearch(e.target.value)} /><span className="saved-count"><Heart size={13}/> {saved.length} saved on this device</span></div>
          </div>
        </section>

        <section className="little-section" id="little-things">
          <div className="section-wrap little-inner">
            <div className="eyebrow">02 / A MOMENT OF CURIOSITY</div>
            <div className="little-grid">
              <div><h2>Little things<br/>to <em>think about.</em></h2><p className="section-desc">A question, a thought, or a conversation starter. Pick one and see where it takes you.</p><button className="button button-outline" onClick={() => setPrompt(prompts[Math.floor(Math.random() * prompts.length)])}><Shuffle size={16}/> Give me another</button></div>
              <div className="prompt-card"><span className="quote-mark">“</span><p>{prompt}</p><span className="prompt-foot">A RANDOM LITTLE QUESTION <Sparkles size={14}/></span></div>
            </div>
          </div>
        </section>

        <section className="section-wrap quiz-section" id="the-quiz">
          <div className="section-heading">
            <div><div className="eyebrow">03 / JUST FOR FUN</div><h2>The Nvna<br/><em>quiz.</em></h2></div>
            <p className="section-desc">Three tiny questions. No wrong answers. Just a fun little way to discover your vibe.</p>
          </div>
          <div className="quiz-card">
            {!finished ? <>
              <div className="quiz-top"><span>QUESTION 0{step + 1} / 0{quiz.length}</span><div className="progress"><span style={{width: `${(step / quiz.length) * 100}%`}}/></div></div>
              <h3>{quiz[step].q}</h3>
              <div className="answer-grid">{quiz[step].a.map((a, i) => <button key={a} className="answer" onClick={() => nextQuestion(a)}><span>0{i+1}</span>{a}<ArrowUpRight size={16}/></button>)}</div>
            </> : <div className="quiz-result"><div className="result-icon"><Sparkles/></div><span className="pill">THAT'S YOUR VIBE</span><h3>A little bit of everything.</h3><p>Your answers: {answers.join(' · ')}</p><button className="button button-dark" onClick={resetQuiz}>Play again <ArrowRight size={16}/></button></div>}
          </div>
        </section>

        <section className="note-banner">
          <div className="section-wrap note-inner"><div><div className="eyebrow">04 / BEFORE YOU GO</div><h2>One last<br/><em>little thing.</em></h2></div><div className="note-right"><p>Every good experience deserves a little note at the end. This one's just for you.</p><button className="button button-light" onClick={() => setNoteOpen(true)}>Open your note <Mail size={16}/></button></div><span className="note-star">✳</span></div>
        </section>
      </main>

      <footer className="footer"><button className="wordmark" onClick={() => goTo('home')}>NVNA<span>.</span></button><span>MADE WITH A LITTLE CURIOSITY <Heart size={12}/></span><button onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>BACK TO TOP ↑</button></footer>

      {noteOpen && <div className="modal-backdrop" onClick={() => setNoteOpen(false)}>
        <div className="note-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setNoteOpen(false)} aria-label="Close note"><X/></button>
          <span className="eyebrow">A LITTLE NOTE FOR YOU</span><div className="modal-flower">✳</div>
          <h2>Hey, Nvna.</h2>
          <p>I thought it would be nice to make you a little corner of the internet. Nothing complicated — just a few things to explore, some music, and a reminder that getting to know someone can be a pretty cool adventure.</p>
          <p className="note-signoff">Hope you enjoy it. <em>— from me</em></p>
        </div>
      </div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
