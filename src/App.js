import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { fetchArticles, createArticle, deleteArticle } from "./articleService";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import "./App.css";

function SignIn() {
  return (
    <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>
      <span>Sign In</span>
    </button>
  );
}

function SignOut() {
  {
    if (auth.currentUser) console.log(auth.currentUser.uid);
  }
  return (
    <div>
      <span className="helloUser">Hello, {auth.currentUser.displayName} </span>
      <button onClick={() => signOut(auth)}>
        <span>Sign Out</span>
      </button>
    </div>
  );
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(null);
  const [user] = useAuthState(auth);

  // This is a trivial app, so just fetch all the articles once, when
  // the app is loaded. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article);
      setArticles([article, ...articles]);
      setWriting(false);
    });
  }

  function removeArticle() {
    deleteArticle({ article }).then((artId) => {
      setArticle(null);
      const newList = articles.filter((item) => item.id !== artId);
      setArticles(newList);
      setWriting(false);
    });
  }

  return (
    <div className="App">
      <header>
        <div className="inner-cutout">
          <h1 className="knockout">Color Guide</h1>{" "}
        </div>
        {!user ? <SignIn /> : <SignOut />}
      </header>

      {!user ? (
        ""
      ) : (
        <Nav
          articles={articles}
          setArticle={setArticle}
          setWriting={setWriting}
          user={user}
        />
      )}

      {!user ? (
        <div>
          <h1 className="log">Sign in to learn about colors!</h1>
        </div>
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} removeArticle={removeArticle} />
      )}
    </div>
  );
}
