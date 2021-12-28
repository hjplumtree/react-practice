import "./App.css";

function HeaderTag() {
  return (
    <header>
      <h1>
        <a href="index.html">React</a>
      </h1>
    </header>
  );
}

function NavTag() {
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

function ArticleTag() {
  return (
    <article>
      <h2>Welcome!</h2>
      Hello, WEB!
    </article>
  );
}
function App() {
  return (
    <div className="App">
      <HeaderTag></HeaderTag>
      <NavTag></NavTag>
      <ArticleTag></ArticleTag>
    </div>
  );
}

export default App;
