import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [yearPublished, setYearPublished] = useState("");

  // Fetch books from backend
  useEffect(() => {
    fetch("http://localhost:2030/springbootlibrary/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // Add book
  const addBook = async () => {
    if (!title || !author || !isbn || !yearPublished) {
      alert("Please enter all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:2030/springbootlibrary/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          isbn,
          yearPublished: parseInt(yearPublished, 10),
        }),
      });

      if (res.ok) {
        const newBook = await res.json();
        setBooks([...books, newBook]);
        setTitle("");
        setAuthor("");
        setIsbn("");
        setYearPublished("");
      } else {
        alert("Failed to add book");
      }
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Library Book Management</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Year Published"
          value={yearPublished}
          onChange={(e) => setYearPublished(e.target.value)}
        />
        <button style={styles.button} onClick={addBook}>
          ➕ Add Book
        </button>
      </div>

      <h2 style={styles.subtitle}>Book List</h2>
      <div style={styles.cardContainer}>
        {books.map((book) => (
          <div key={book.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>ISBN:</b> {book.isbn}</p>
            <p><b>Year:</b> {book.yearPublished}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: "1 1 200px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: "1 1 150px",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
  },
  subtitle: {
    textAlign: "center",
    marginTop: "30px",
    color: "#34495e",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    margin: "0 0 10px",
    color: "#2c3e50",
  },
};

export default App;
