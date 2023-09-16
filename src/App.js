import { db } from "./firebaseConnection";
import "./app.css";
import { useState } from "react";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const [posts, setPosts] = useState([]);

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
    // const postRef = doc(db, "posts", "sCgPFaFhKcYNMtYIz318");

    // await getDoc(postRef).then((snapshot) => {
    //   setAutor(snapshot.data().autor);
    //   setTitulo(snapshot.data().titulo);
    // });

    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((error) => {
        console.log("Deu erro " + error);
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

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>Titulo: {post.titulo}</span>
                <br></br>

                <span>Autor: {post.autor}</span>
                <br></br>
                <br></br>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
