import { useState } from "react";

function BookForm({ onAddBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [yearPublished, setYearPublished] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert("Title and Author are required!");
      return;
    }
    onAddBook({ title, author, isbn, yearPublished });
    setTitle("");
    setAuthor("");
    setIsbn("");
    setYearPublished("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year Published"
        value={yearPublished}
        onChange={(e) => setYearPublished(e.target.value)}
      />
      <button type="submit">➕ Add Book</button>
    </form>
  );
}

export default BookForm;
