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
  function clickHandler(evt) {
    evt.preventDefault();
    props.onChangeMode("READ", Number(evt.target.dataset.id));
  }
  let lis = [];
  for (let i = 0; i < props.data.length; i = i + 1) {
    let d = props.data[i];
    lis.push(
      <li key={d.id}>
        <a href={"/read/" + d.id} data-id={d.id} onClick={clickHandler}>
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
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  let topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ];
  function ChangeModeHandler(_mode, _id) {
    setMode(_mode);
    setId(_id);
  }
  let articleTag;
  if (mode === "WELCOME") {
    articleTag = <Article title="Welcome" body="Hello, React!" />;
  } else if (mode === "READ") {
    let title = null;
    let body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    // const { title, body } = topics.filter((ele) => ele.id == id)[0];
    articleTag = <Article title={title} body={body} />;
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
