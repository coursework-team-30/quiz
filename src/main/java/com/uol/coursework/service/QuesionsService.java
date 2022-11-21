package com.uol.coursework.service;


import com.uol.coursework.model.Quiz;
import com.uol.coursework.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class QuesionsService {
    @Autowired
    private QuestionsRepository questionsRepository;

    public List<Quiz> get10Questions() {
        var data = questionsRepository.find10Questions();

        return data.stream().map(question -> {
            var correctAnswer =  question.getCorrectAnswer();
            var incorrectAnswers = question.getIncorrectAnswers();

            ArrayList<String> options = incorrectAnswers;
            options.add(correctAnswer);

            System.out.println(options);

            Collections.shuffle(options);
            return new Quiz(question.getQuestion(), options, correctAnswer);
        }).toList();
    }
}
