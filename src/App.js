import { db, auth } from "./firebaseConnection";

import "./app.css";
import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPost() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(listaPost);
      });
    }

    loadPost();
  }, []);

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

  async function atualizarPost() {
    const docRef = doc(db, "posts", idPost);

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Atualizado com sucesso");
        setAutor("");
        setTitulo("");
        setIdPost("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setEmail("");
        setSenha("");
        console.log("CADASTRADO COM SUCESSO");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email já em uso");
        }
      });
  }

  return (
    <div>
      <h1>REACT + FIREBASE :)</h1>

      <div className="container">
        <h2>Usuarios</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <br></br>

        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Infome sua senha"
        />
        <br></br>

        <button onClick={novoUsuario}>Cadastrar</button>
      </div>

      <br></br>
      <hr />
      <div className="container">
        <h2>POSTS</h2>
        <label>Id do Post:</label>
        <br></br>
        <input
          placeholder="Digite o Id do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />

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
        <br></br>

        <button onClick={atualizarPost}>Atualizar Post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong>
                <br></br>
                <span>Titulo: {post.titulo}</span>
                <br></br>

                <span>Autor: {post.autor}</span>
                <br></br>
                <button onClick={() => excluirPost(post.id)}>Excluir</button>
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
