import "./App.css";

function Header(props) {
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode();
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
  let lis = [];
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode();
  }

  for (let i = 0; i < props.data.length; i++) {
    let d = props.data[i];
    lis.push(
      <li key={d.id}>
        <a href={"/read/" + d.id} onClick={onClickHandler}>
          {d.title}
        </a>
      </li>,
    );
  }

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
function App() {
  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];

  function onChangeModeHandler() {
    alert("change!");
  }
  function onChangeNavModeHandler() {
    alert("changeNav!");
  }
  return (
    <div className="App">
      <Header title="Web" onChangeMode={onChangeModeHandler} />
      <Nav data={topics} onChangeMode={onChangeNavModeHandler} />
      <Article title="Welcome" body="Hello, React!" />
    </div>
  );
}

export default App;
