import "./App.css";

function App() {
  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  function onChangeModeHandler(mode) {
    alert(mode);
  }

  return (
    <div className="App">
      <Header title="Web" onChangeMode={onChangeModeHandler} />
      <Nav data={topics} onChangeMode={onChangeModeHandler} />
      <Article title="Welcome" body="Hello, React!" />
    </div>
  );
}

function Header(props) {
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode(1);
  }
  return (
    <header>
      <h1>
        <a href="index.html" onClick={onClickHandler}>
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("READ");
  }

  const lis = props.data.map((d) => {
    return (
      <li key={d.id}>
        <a href={"/read/" + d.id} onClick={onClickHandler}>
          {d.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

export default App;
