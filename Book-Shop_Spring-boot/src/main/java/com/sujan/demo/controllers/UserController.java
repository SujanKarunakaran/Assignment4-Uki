package com.sujan.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.sujan.demo.model.User1;
import com.sujan.demo.services.UserService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
    private UserService userService;
	
	@PostMapping
    public ResponseEntity<User1> createUser(@RequestBody User1 user){
		return userService.createUser(user);
	}
	
	@GetMapping
    public ResponseEntity<List<User1>> listUsers(){
		return userService.listUsers();
    }
	
	@GetMapping(params = "id")
	public ResponseEntity<User1> getUserById(@RequestParam Integer id){
	    return userService.getUserById(id);
	}
	
	@GetMapping(params = "userName")
	public ResponseEntity<User1> getUserByUsername(@RequestParam String userName){
	    return userService.getUserByUsername(userName);
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<User1> updateUser(@PathVariable("id") Integer id, @RequestBody User1 user) {
        return userService.updateUser(id, user);
    }
	
	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable int id) {
	    return userService.deleteUser(id);
	}

}
