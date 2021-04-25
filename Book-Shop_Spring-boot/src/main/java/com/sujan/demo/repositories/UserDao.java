package com.sujan.demo.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sujan.demo.model.User1;

@Repository
public interface UserDao extends MongoRepository<User1, Integer> {
	Optional<User1> findByUsername(String username);
}
