package com.uol.coursework.model;

public class NewScore {
    private String userName;
    private String email;
    private int score;

    public NewScore(String userName, String email, int score) {
        this.userName = userName;
        this.email = email;
        this.score = score;
    }

    public String getUserName() {
        return userName;
    }

    public int getScore() {
        return score;
    }

    public String getEmail() {
        return email;
    }
}
