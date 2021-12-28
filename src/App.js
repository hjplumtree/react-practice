import "./App.css";

function Header(props) {
  return (
    <header>
      <h1>
        <a href="index.html">{props.title}</a>
      </h1>
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <a href="1.html">html</a>
        </li>
        <li>
          <a href="2.html">css</a>
        </li>
        <li>
          <a href="3.html">js</a>
        </li>
      </ol>
    </nav>
  );
}

function Article(props) {
  console.log("props", props);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function App() {
  return (
    <div className="App">
      <Header title="Web" />
      <Nav />
      <Article title="Welcome" body="Hello, React!" />
    </div>
  );
}

export default App;
