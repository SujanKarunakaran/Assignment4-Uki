package com.sujan.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sujan.demo.model.User1;
import com.sujan.demo.repositories.UserDao;
import com.sujan.demo.repositories.UserRepositoryCustom;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserRepositoryCustom userRepositoryCustom;
	
	public ResponseEntity<User1> createUser(User1 user) {
		try {
			Integer id = userRepositoryCustom.getMaxUserId() + 1;
			User1 userNew = userDao.save(new User1(id, user.getFirstName(), user.getLastName(), 
					user.getUsername(), user.getPassword(), user.getSalary(), user.getAge()));
		    return new ResponseEntity<>(userNew, HttpStatus.CREATED);
		} catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	public ResponseEntity<List<User1>> listUsers() {
		try {
		    List<User1> users = new ArrayList<User1>();
		    userDao.findAll().forEach(users::add);
		    if (users.isEmpty()) {
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    }
		    return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
		    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<User1> getUserById(Integer id) {
		Optional<User1> user = userDao.findById(id);
		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<User1> updateUser(Integer id, User1 user) {
		Optional<User1> userData = userDao.findById(id);

		if (userData.isPresent()) {
			User1 userOld = userData.get();
			userOld.setFirstName(user.getFirstName());
			userOld.setLastName(user.getLastName());
			userOld.setSalary(user.getSalary());
			userOld.setAge(user.getAge());
		    return new ResponseEntity<>(userDao.save(userOld), HttpStatus.OK);
		} else {
		    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<HttpStatus> deleteUser(int id) {
		Optional<User1> user = userDao.findById(id);
		if (user.isPresent()) {
			userDao.delete(user.get());
		    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<User1> getUserByUsername(String userName) {
		Optional<User1> user = userDao.findByUsername(userName);
		if (user.isPresent()) {
			return new ResponseEntity<>(user.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
