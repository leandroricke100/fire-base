import { db } from "./firebaseConnection";
import "./app.css";
import { useState } from "react";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     console.log("Dados registrado com sucesso");
    //   })
    //   .catch((error) => {
    //     console.log(`Gerou erro ${error}`);
    //   });

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Registrado com sucesso");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("Erro" + error);
      });
  }

  async function buscarPost() {
    const postRef = doc(db, "posts", "sCgPFaFhKcYNMtYIz318");

    await getDoc(postRef).then((snapshot) => {
      setAutor(snapshot.data().autor);
      setTitulo(snapshot.data().titulo);
    });
  }

  return (
    <div className="App">
      <h1>REACT + FIREBASE</h1>

      <div className="container">
        <label>Título:</label>
        <textarea
          typeof="text"
          placeholder="Digite um titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <input
          typeof="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>

        <button onClick={buscarPost}>Buscar Post</button>
      </div>
    </div>
  );
}

export default App;
