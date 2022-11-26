package com.uol.coursework.model;

public class LeaderboardScorer {
    private String userName;
    private Integer latestScore;
    private Integer highScore;

    public LeaderboardScorer(String userName, Integer latestScore, Integer highScore) {
        this.userName = userName;
        this.latestScore = latestScore;
        this.highScore = highScore;
    }

    public String getUserName() {
        return userName;
    }

    public Integer getLatestScore() {
        return latestScore;
    }

    public Integer getHighScore() {
        return highScore;
    }
}
