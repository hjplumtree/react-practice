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

function Nav(props) {
  console.log(props.data);
  let lis = [];

  for (let i = 0; i < props.data.length; i++) {
    let d = props.data[i];
    lis.push(
      <li key={d.id}>
        <a href={"/read/" + d.id}>{d.title}</a>
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
  return (
    <div className="App">
      <Header title="Web" />
      <Nav data={topics} />
      <Article title="Welcome" body="Hello, React!" />
    </div>
  );
}

export default App;
