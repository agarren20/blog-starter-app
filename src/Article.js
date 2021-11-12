import { useRef } from "react";

export default function Article({ article, removeArticle }) {
  return (
    <article>
      {!article ? (
        <p>
          <h1 className="welcome">
            Welcome to the blog! Select an article to read!
          </h1>
        </p>
      ) : (
        <div>
          <section>
            <h2>{article.title}</h2>
            <p className="date">{`Posted: ${article.date}`}</p>
            <p className="body">{article.body}</p>
          </section>
          <button
            onClick={() => {
              removeArticle(article);
            }}
          >
            <span>Delete</span>
          </button>
        </div>
      )}
    </article>
  );
}
