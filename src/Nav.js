export default function Nav({ articles, setArticle, user, setWriting }) {
  return (
    <nav>
      {user && (
        <button onClick={() => setWriting(true)}>
          <span>New Article</span>
        </button>
      )}
      <ul>
        {!articles || articles.length == 0
          ? "No articles"
          : articles.map((a) => (
              <li
                key={a.id}
                onClick={() => {
                  setArticle(a);
                  setWriting(false);
                }}
              >
                {a.title}
              </li>
            ))}
      </ul>
    </nav>
  );
}
