package com.sujan.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sujan.demo.model.BookModel;
import com.sujan.demo.services.BookService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/books")

public class BookController {
	
	@Autowired
	BookService bookService;
	
	@PostMapping
	public ResponseEntity<?> createBook(@RequestBody BookModel book) {
		return bookService.createBook(book);
		}
	
	@PutMapping("/{id}")
	public ResponseEntity<BookModel> updateBook(@PathVariable String id,@RequestBody BookModel book) {
	return bookService.updateBook(id, book);
	} 
	
	@GetMapping
    public ResponseEntity<List<BookModel>> listBooks(){
		return bookService.listBooks();
    }
	
	@GetMapping("/search/{search}")
	public ResponseEntity<?> getBooks(@PathVariable String search, @RequestParam(value="pageNo",defaultValue="0") int pageNo,
	@RequestParam(value="pageSize",defaultValue="0") int pageSize,@RequestParam(name = "sortBy", defaultValue = "id") String sortBy){
	return bookService.getBookBySearch(search,pageNo,pageSize,sortBy);
	} 
	
	@GetMapping("/page")
	public ResponseEntity<Map<String, Object>> getBooks(@RequestParam(value="pageNo",defaultValue="0") int pageNo,
	@RequestParam(value="pageSize",defaultValue="0") int pageSize,@RequestParam(name = "sortBy", defaultValue = "id") String sortBy){
	return bookService.getBooks(pageNo,pageSize,sortBy);
	}
	
	@GetMapping(params = "id")
	private ResponseEntity<BookModel> getBookById(@PathVariable String id) {
		return bookService.getBookById(id);
	}
	
	@DeleteMapping("/delete/{id}")
	private ResponseEntity<?>deleteBookById(@PathVariable String id) {
		return bookService.deleteBookById(id);
	}
	

}
