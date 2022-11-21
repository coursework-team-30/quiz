package com.uol.coursework.repository;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(schema = "questions")
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "category")
    private String category;
    @Column(name = "question")
    private String question;
    @Column(name = "correct_answer")
    private String correctAnswer;
    @Column(name = "incorrect_answer1")
    private String incorrectAnswer1;

    @Column(name = "incorrect_answer2")
    private String incorrectAnswer2;

    @Column(name = "incorrect_answer3")
    private String incorrectAnswer3;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "identifier")
    private String identifier;

    public String getQuestion() {
        return question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public ArrayList<String> getIncorrectAnswers() {

        ArrayList<String> options = new ArrayList<>();
        options.add(this.incorrectAnswer1);
        options.add(this.incorrectAnswer2);
        options.add(this.incorrectAnswer3);

        return options;
    }
}
