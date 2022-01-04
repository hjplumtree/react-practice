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

function Create(props) {
  function submitHandler(evt) {
    evt.preventDefault();
    let title = evt.target.title.value;
    let body = evt.target.body.value;
    props.onSubmit(title, body);
  }
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);
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
  } else if (mode === "CREATE") {
    function createSubmitHandler(_title, _body) {
      const nextId = topics.length + 1;
      setTopics((current) => {
        const newTopics = [...current];
        newTopics.push({
          id: nextId,
          title: _title,
          body: _body,
        });
        return newTopics;
      });
      setMode("READ");
      setId(nextId);
    }
    console.log(topics);
    articleTag = <Create onSubmit={createSubmitHandler} />;
  } else if (mode === "UPDATE") {
    articleTag = <Article title="Update" body="Hello, Update" />;
  } else if (mode === "DELETE") {
    articleTag = <Article title="Delete" body="Hello, Delete" />;
  }

  return (
    <>
      <Header title="WEB" onChangeMode={ChangeModeHandler} />
      <Nav data={topics} onChangeMode={ChangeModeHandler} />
      {articleTag}
      <Control onChangeMode={ChangeModeHandler} />
    </>
  );
}

function Control(props) {
  function ClickHandler(event) {
    event.preventDefault();
    props.onChangeMode("CREATE");
  }

  function UpdateHandler(event) {
    event.preventDefault();
    props.onChangeMode("UPDATE");
  }

  function DeleteHandler(event) {
    event.preventDefault();
    props.onChangeMode("DELETE");
  }

  return (
    <ul>
      <li>
        <a onClick={ClickHandler} href="/create">
          create
        </a>
      </li>
      <li>
        <a onClick={UpdateHandler} href="/update">
          update
        </a>
      </li>
      <li>
        <a onClick={DeleteHandler} href="/delete">
          delete
        </a>
      </li>
    </ul>
  );
}

export default App;
