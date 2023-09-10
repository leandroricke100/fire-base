import { db } from "./firebaseConnection";
import "./app.css";

function App() {
  function handleAdd() {
    alert("teste");
  }

  return (
    <div className="App">
      <h1>REACT + FIREBASE</h1>

      <div className="container">
        <label>Título:</label>
        <textarea typeof="text" placeholder="Digite um titulo" />

        <label>Autor:</label>
        <input typeof="text" placeholder="Autor do post" />

        <button onClick={handleAdd}>Cadastrar</button>
      </div>
    </div>
  );
}

export default App;
