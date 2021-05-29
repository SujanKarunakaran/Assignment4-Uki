package com.sujan.demo.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sujan.demo.model.BookModel;
import com.sujan.demo.repositories.BookRepository;

@Service
public class BookService {
	
	@Autowired
	BookRepository bookRepository;
	
	public ResponseEntity<BookModel> createBook(BookModel book) {
		try {
			BookModel tt = bookRepository.save(book);
			return new ResponseEntity<>(tt, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	public ResponseEntity<List<BookModel>> listBooks() {
		try {
		    List<BookModel> books = new ArrayList<BookModel>();
		    bookRepository.findAll().forEach(books::add);
		    if (books.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(books, HttpStatus.OK);
		} catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<BookModel> updateBook(String id,BookModel book) {
		Optional<BookModel>t=bookRepository.findById((id));
		if(t.isPresent()) {
			BookModel _book=t.get();
			_book.setTitle(book.getTitle());
			_book.setAuthor(book.getAuthor());
			_book.setPrice(book.getPrice());
			_book.setIsbnNumber(book.getIsbnNumber());
			_book.setLanguage(book.getLanguage());
			_book.setCoverPhotoURL(book.getCoverPhotoURL());
			_book.setGenre(book.getGenre());

			BookModel updatedBook=bookRepository.save(_book);
			return new ResponseEntity<>(updatedBook,HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
	}	
	
	public ResponseEntity<Page<BookModel>> getBookBySearch(String searchText, int pageNo, int pageSize, String sortBy) {
		try {
//		 List<BookModel> book = bookRepository.findByTitleContaining(title);

		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<BookModel> bookPages = bookRepository.searchBooks(pageable, ".*" + searchText + ".*");
		 if (bookPages.isEmpty()) {
		 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		 }
		return new ResponseEntity<>(bookPages, HttpStatus.OK);
		} catch (Exception e) {
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		}
	
	public ResponseEntity<Map<String, Object>> getBooks(int pageNo, int pageSize, String sortBy) {
	  try {System.out.println(pageNo);
	  System.out.println(pageSize);
	  System.out.println(sortBy);
	  Map<String, Object> response = new HashMap<>();
	    Sort sort = Sort.by(sortBy);
	    System.out.println(sort);
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
		 System.out.println(pageable);
	    Page<BookModel> page = bookRepository.findAll(pageable);
	    System.out.println(page);
	    response.put("data", page.getContent());
	    System.out.println(response);
	    response.put("Total no of pages", page.getTotalPages());
	    response.put("Total no of elements", page.getTotalElements());
	    response.put("Current page no", page.getNumber());
		    
		    return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<BookModel>getBookById(String id ){
		try {Optional<BookModel>book=bookRepository.findById(id);
						
							if(book.isPresent()){
								
						BookModel newBook= book.get();
						
								
									return  new ResponseEntity<>(newBook, HttpStatus.OK);
							}else {
								return new ResponseEntity<>(HttpStatus.NO_CONTENT);	
							}
			
			
		}catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public ResponseEntity<?>deleteBookById(String id ){
		try {Optional<BookModel>book=bookRepository.findById(id);
						
							if(book.isPresent()){
								bookRepository.deleteById(id);
						
								
									return  new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
							}else {
								return new ResponseEntity<>(HttpStatus.NOT_FOUND);	
							}
			
			
		}catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
