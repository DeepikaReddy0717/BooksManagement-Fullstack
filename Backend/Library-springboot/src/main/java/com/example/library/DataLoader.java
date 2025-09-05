package com.example.library;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

  private final BookRepository repo;

  public DataLoader(BookRepository repo) {
    this.repo = repo;
  }

  @Override
  public void run(String... args) throws Exception {
    if (repo.count() == 0) {
      repo.save(new Book("Clean Code", "Robert C. Martin", "9780132350884", 2008));
      repo.save(new Book("The Pragmatic Programmer", "Andrew Hunt & David Thomas", "9780201616224", 1999));
    }
  }
}
