function BookList({ books }) {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}{" "}
            ({book.yearPublished || "N/A"}) — ISBN: {book.isbn || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
