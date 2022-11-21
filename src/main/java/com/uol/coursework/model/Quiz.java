package com.uol.coursework.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.ArrayList;
import java.util.List;
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Quiz {
    private String question;
    private List<String> options;
    private String correctAnswer;

    public Quiz(String question, List<String> options, String answer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = answer;
    }

}
