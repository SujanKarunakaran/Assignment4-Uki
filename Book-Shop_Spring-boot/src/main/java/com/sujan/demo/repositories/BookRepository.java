package com.sujan.demo.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.sujan.demo.model.BookModel;

@Repository
public interface BookRepository extends MongoRepository<BookModel, String>{
	@Query("{'$or':[ {'title': {$regex : ?0, $options: 'i'}}, {'author': {$regex : ?0, $options: 'i'}}, {'language': {$regex : ?0, $options: 'i'}}, {'genre': {$regex : ?0, $options: 'i'}}]}")
	Page<BookModel> searchBooks(Pageable pageable, String searchText); 

}
