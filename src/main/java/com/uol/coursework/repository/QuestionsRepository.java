package com.uol.coursework.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionsRepository extends CrudRepository<Questions, Long> {
    @Query(nativeQuery = true, value="SELECT * FROM Questions ORDER BY RAND() LIMIT 10")
    List<Questions> find10Questions();
}
