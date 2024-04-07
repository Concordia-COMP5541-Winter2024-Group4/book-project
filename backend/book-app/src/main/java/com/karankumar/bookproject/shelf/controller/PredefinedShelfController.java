/*
 * The book project lets a user keep track of different books they would like to read, are currently
 * reading, have read or did not finish.
 * Copyright (C) 2021  Karan Kumar
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

package com.karankumar.bookproject.shelf.controller;

import com.karankumar.bookproject.book.model.Book;
import com.karankumar.bookproject.shelf.model.PredefinedShelf.ShelfName;
import com.karankumar.bookproject.book.service.BookService;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/shelf/books")
public class PredefinedShelfController {

  private final BookService bookService;

  @Autowired
  public PredefinedShelfController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping(path = "/recommendations")
  // TODO: only retrieve books that belong to the logged in user
  public List<Book> getAllRecommendedBooks() {
    LOGGER.info("Retrieving all recommended books:" + ShelfName.Recommendations);
    List<Book> res = bookService.findAllBooksByPredefinedShelfName(ShelfName.Recommendations);
    List<Book> favoriteBooks = bookService.findAllBooksByPredefinedShelfName(ShelfName.Favorties);
    List<Book> candidates = new ArrayList<>();
        candidates.addAll(res);
        candidates.addAll(getAllToReadBooks());
        candidates.addAll(getAllReadingBooks());
        candidates.addAll(getAllReadBooks());
        candidates.addAll(getAllDidNotFinishBooks());
    LOGGER.info("Retrieved " + candidates.size() + " recommended books");
    return candidates;
  }

  @GetMapping(path = "/favorites")
  // TODO: only retrieve books that belong to the logged in user
  public List<Book> getAllFavoriteBooks() {
    LOGGER.info("Retrieving all favorite books:" + ShelfName.Favorties);
    List<Book> res = bookService.findAllBooksByPredefinedShelfName(ShelfName.Favorties);
    LOGGER.info("Retrieved " + res.size() + " favorite books");
    return res;
  }

  @GetMapping(path = "/to-read")
  // TODO: only retrieve books that belong to the logged in user
  public List<Book> getAllToReadBooks() {
    LOGGER.info("Retrieving all to-read books:" + ShelfName.TO_READ);
    List<Book> res = bookService.findAllBooksByPredefinedShelfName(ShelfName.TO_READ);
    LOGGER.info("Retrieved " + res.size() + " to-read books");
    return res;
  }

  @GetMapping(path = "/reading")
  // TODO: only retrieve books that belong to the logged in user
  public List<Book> getAllReadingBooks() {
    LOGGER.info("Retrieving all reading books:" + ShelfName.READING);
    List<Book> res = bookService.findAllBooksByPredefinedShelfName(ShelfName.READING);
    LOGGER.info("Retrieved " + res.size() + " reading books");
    return res;
  }

  @GetMapping(path = "/read")
  // TODO: only retrieve books that belong to the logged in user
  public List<Book> getAllReadBooks() {
    LOGGER.info("Retrieving all read books: " + ShelfName.READ);
    List<Book> res = bookService.findAllBooksByPredefinedShelfName(ShelfName.READ);
    LOGGER.info("Retrieved " + res.size() + " read books");
    return res;
  }

  @GetMapping(path = "/did-not-finish")
  // TODO: only retrieve books that belong to the logged in user
  public List<Book> getAllDidNotFinishBooks() {
    LOGGER.info("Retrieving all did-not-finish books:" + ShelfName.DID_NOT_FINISH);
    List<Book> res = bookService.findAllBooksByPredefinedShelfName(ShelfName.DID_NOT_FINISH);
    LOGGER.info("Retrieved " + res.size() + " did not finish books");
    return res;
  }
}
