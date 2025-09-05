package com.example.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "books")
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 200)
  private String title;

  @NotBlank
  @Size(max = 150)
  private String author;

  @Size(max = 50)
  private String isbn;

  private Integer yearPublished;

  public Book() {}

  public Book(String title, String author, String isbn, Integer yearPublished) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.yearPublished = yearPublished;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }

  public String getAuthor() { return author; }
  public void setAuthor(String author) { this.author = author; }

  public String getIsbn() { return isbn; }
  public void setIsbn(String isbn) { this.isbn = isbn; }

  public Integer getYearPublished() { return yearPublished; }
  public void setYearPublished(Integer yearPublished) { this.yearPublished = yearPublished; }

  @Override
  public String toString() {
    return "Book{" +
        "id=" + id +
        ", title='" + title + '\'' +
        ", author='" + author + '\'' +
        '}';
  }
}
