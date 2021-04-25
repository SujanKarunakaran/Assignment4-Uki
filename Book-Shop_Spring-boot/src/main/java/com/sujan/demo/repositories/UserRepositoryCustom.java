package com.sujan.demo.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.sujan.demo.model.User1;

@Repository
public class UserRepositoryCustom {
	@Autowired
    MongoTemplate mongoTemplate;
 
    public Integer getMaxUserId() {
		Query query = new Query();
		query.with(Sort.by(Sort.Direction.DESC, "id"));
		query.limit(1);
		User1 maxObject = mongoTemplate.findOne(query, User1.class);
		if (maxObject == null) {
		    return 0;
		}
		return maxObject.getId();
    }

}
