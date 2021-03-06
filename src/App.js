import "./App.css";
import { useState } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <h1>
        <Link to="/">{props.title}</Link>
      </h1>
    </header>
  );
}

function Nav(props) {
  let lis = [];
  for (let i = 0; i < props.data.length; i = i + 1) {
    let d = props.data[i];

    lis.push(
      <li key={d.id}>
        <Link to={"/read/" + d.id}>{d.title}</Link>
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

function Update(props) {
  const params = useParams();
  const id = Number(params.id);
  const topics = props.topics;
  let _title = null;
  let _body = null;

  for (let i = 0; i < topics.length; i++) {
    if (topics[i].id === id) {
      _title = topics[i].title;
      _body = topics[i].body;
    }
  }

  const [title, setTitle] = useState(_title);
  const [body, setBody] = useState(_body);

  function submitHandler(evt) {
    evt.preventDefault();
    let title = evt.target.title.value;
    let body = evt.target.body.value;
    props.onSubmit(id, title, body);
  }
  console.log(props.title, props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={submitHandler}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(evt) => setBody(evt.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="update" />
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "js", body: "js is ..." },
  ]);
  function ChangeModeHandler(_mode, _id) {
    if (_mode === "DELETE") {
      let newTopcis = topics.filter((topic) => topic.id !== id);
      setTopics(newTopcis);
      setMode("WELCOME");
      return;
    }

    setMode(_mode);
    setId(_id);
  }

  /*
  if (mode === "CREATE") {
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
    let title = null;
    let body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    articleTag = (
      <Update title={title} body={body} onSubmit={updateSubmitHandler} />
    );

    function updateSubmitHandler(_title, _body) {
      const newTopics = [...topics];
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i].title = _title;
          newTopics[i].body = _body;
        }
      }
      setTopics(newTopics);
      setMode("READ");
    }

  } else if (mode === "DELETE") {
    articleTag = <Article title="Delete" body="Hello, Delete" />;
  }
*/

  return (
    <>
      <Header title="WEB" onChangeMode={ChangeModeHandler} />
      <Nav data={topics} onChangeMode={ChangeModeHandler} />
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, React!" />}
        ></Route>
        <Route path="/read/:id" element={<Read topics={topics}></Read>}></Route>
        <Route
          path="/create"
          element={
            <Create
              onSubmit={(_title, _body) => {
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
                navigate("/read/" + nextId);
              }}
            ></Create>
          }
        ></Route>
        <Route
          path="/update/:id"
          element={
            <Update
              topics={topics}
              onSubmit={(id, _title, _body) => {
                const newTopics = [...topics];
                for (let i = 0; i < newTopics.length; i++) {
                  if (newTopics[i].id === id) {
                    newTopics[i].title = _title;
                    newTopics[i].body = _body;
                  }
                }
                setTopics(newTopics);
                navigate("/read/" + id);
              }}
            ></Update>
          }
        ></Route>
      </Routes>

      <Routes>
        <Route
          path="/"
          element={<Control onChangeMode={ChangeModeHandler} selectedId={id} />}
        ></Route>
        <Route
          path="/read/:id"
          element={<Control onChangeMode={ChangeModeHandler} selectedId={id} />}
        ></Route>
      </Routes>
    </>
  );
}

function Read(props) {
  const params = useParams();
  const id = Number(params.id);
  const topics = props.topics;
  let title = null;
  let body = null;

  for (let i = 0; i < topics.length; i++) {
    if (topics[i].id === id) {
      title = topics[i].title;
      body = topics[i].body;
    }
  }

  return <Article title={title} body={body} />;
}

function Control(props) {
  function ClickHandler(event) {
    event.preventDefault();
    props.onChangeMode("CREATE");
  }

  function UpdateHandler(event) {
    event.preventDefault();
    props.onChangeMode("UPDATE", props.selectedId);
  }

  const params = useParams();
  const selectedId = Number(params.id);
  console.log(selectedId);
  let contextUI = null;
  if (selectedId > 0) {
    contextUI = (
      <>
        <li>
          <Link to={"/update/" + selectedId}>update</Link>
        </li>

        <li>
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              props.onChangeMode("DELETE");
            }}
          >
            <input type="submit" value="delete" />
          </form>
        </li>
      </>
    );
  }
  return (
    <ul>
      <li>
        <Link to="/create">create</Link>
      </li>
      {/* <li>
        <Link to="/update">update</Link>
      </li> */}
      {contextUI}
    </ul>
  );
}

export default App;
