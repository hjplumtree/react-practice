import "./App.css";

function Header(props) {
  console.log(props.onChangeMode);
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
  function clickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode();
  }
  for (let i = 0; i < props.data.length; i = i + 1) {
    let d = props.data[i];
    lis.push(
      <li key={d.id}>
        <a href={"/read/" + d.id} onClick={clickHandler}>
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
    <>
      <Header title="WEB" onChangeMode={onChangeModeHandler} />
      <Nav data={topics} onChangeMode={onChangeNavModeHandler} />
      <Article title="Welcome" body="Hello, React!" />
    </>
  );
}

export default App;
