package com.uol.coursework.controller;

import com.uol.coursework.model.Quiz;
import com.uol.coursework.service.QuesionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz/")
public class CourseController {

    @Autowired
    QuesionsService quizService;

    @GetMapping("/get10")
    public List<Quiz> getQuestions() {
        return quizService.get10Questions();
    }
}
