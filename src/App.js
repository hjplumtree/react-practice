import "./App.css";
import { useState } from "react";

function Header(props) {
  function onClickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("WELCOME");
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
    props.onChangeMode("READ");
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
  // let _mode = useState("WELCOME");
  // let mode = _mode[0];
  // let setMode = _mode[1];

  let [mode, setMode] = useState("WELCOME");

  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  function ChangeModeHandler(_mode) {
    setMode(_mode);
  }
  let articleTag;
  if (mode === "WELCOME") {
    articleTag = <Article title="Welcome" body="Hello, React!" />;
  } else if (mode === "READ") {
    articleTag = <Article title="Read" body="Hello, READ!" />;
  }

  return (
    <>
      <Header title="WEB" onChangeMode={ChangeModeHandler} />
      <Nav data={topics} onChangeMode={ChangeModeHandler} />
      {articleTag}
    </>
  );
}

export default App;
