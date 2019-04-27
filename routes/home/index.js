import Editor from '../../components/editor.js'
const { highlight, languages } = Prism

const style = {
  editor: {
    width: '100%',
    minHeight: '100%',
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
    borderRadius: '1rem',
    fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New'",
    lineHeight: '170%',
  },
  browser: css`
    padding: 3rem;
    background: #2f3138;
    @media (orientation: portrait) {
      padding: 2rem;
    }
  `,
  iframe: css`
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    background: #2c2d33;
    border-top: 3rem solid #2a2b2f;
    border-right: 0.5rem solid #2a2b2f;
    border-bottom: 2rem solid #2a2b2f;
    border-left: 0.5rem solid #2a2b2f;
    border-radius: 1.5rem;
    box-shadow: 0 1rem 1rem 0.5rem rgba(0, 0, 0, 0.05);
  `,
  article: css`
    grid-area: tests;
    padding: 3rem;
    background: #2f3138;
    color: rgba(255, 255, 255, 0.62);
    overflow: visible;
    @media (orientation: portrait) {
      padding: 2rem;
    }
  `,
}

const init = location.hash
  ? {
      dialog: false,
      before: atob(location.hash.slice(1)),
    }
  : {
      dialog: true,
      before: `
// Simple react app by @lukejacksonn
// ----------------
  
import { react, html, css } from 'https://unpkg.com/rplus'

const random = () => \`\${Math.random() * 80}%\`
const style = css\`
  position:absolute; font-size: 2rem;
  background: transparent; color: #fff;
  width: 5rem; height: 5rem;
  border-radius: 50%;
\`

const app = () => {
  const [score, setScore] = react.useState(0)
  return html\`
    <button
      className=\${style}
      onClick=\${e => setScore(score + 1)}
      style=\${{ left: random(), top: random() }}
    >\${score}</button>
  \`
}

react.render(html\`<\${app} />\`, document.body)
`.trim(),
    }

const compile = src => btoa(`<script type="module">${src}</script>`)

export default () => {
  const [before, setBefore] = React.useState(init.before)
  const [dialog, setDialog] = React.useState(init.dialog)

  React.useEffect(() => {
    !dialog && (location.hash = `#${btoa(before)}`)
  }, [before, dialog])

  return html`
    <main className="app">
      ${!dialog &&
        html`
          <${React.Fragment}>
            <article className=${style.article}>
              <${Editor}
                value=${before}
                onValueChange=${code => setBefore(code)}
                highlight=${code => highlight(code, languages.js)}
                style=${style.editor}
              />
            </article>
            <aside className=${style.browser}>
              <iframe
                className=${style.iframe}
                frameBorder="0"
                src=${`data:text/html;base64,${compile(before)}`}
              ></iframe>
            </aside>
          <//>
        `}
      ${dialog &&
        html`
          <dialog open>
            <h1><i>Gistlink</i></h1>
            <h3>JavaScript snippet execution</h3>
            <p>
              Code apps or components. See them render as you type. Share your
              creations via URL.
            </p>
            <button onClick=${_ => setDialog(false)}>
              Start Developing
            </button>
          </dialog>
        `}
    </main>
  `
}
