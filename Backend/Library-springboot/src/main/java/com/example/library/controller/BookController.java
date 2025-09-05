package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*") // allow Vite dev server
public class BookController {

  private final BookRepository repo;

  public BookController(BookRepository repo) {
    this.repo = repo;
  }

  // Create
  @PostMapping
  public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
    Book saved = repo.save(book);
    return ResponseEntity.created(URI.create("/api/books/" + saved.getId())).body(saved);
  }

  // Read all
  @GetMapping
  public List<Book> getAllBooks() {
    return repo.findAll();
  }

  // Read one
  @GetMapping("/{id}")
  public ResponseEntity<Book> getById(@PathVariable Long id) {
    return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }
}
