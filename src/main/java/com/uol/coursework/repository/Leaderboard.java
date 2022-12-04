package com.uol.coursework.repository;

import javax.persistence.*;

@Entity
@Table(schema = "leaderboard")
public class Leaderboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "mail_id", nullable = false)
    private String mailId;

    @Column(name = "latest_score", nullable = false)
    private Integer latestScore;

    @Column(name = "highest_score", nullable = false)
    private Integer highestScore;

    public Leaderboard() {

    }

    public Leaderboard(Long id, String userName, String mailId, Integer latestScore, Integer highestScore) {
        this.id = id;
        this.userName = userName;
        this.mailId = mailId;
        this.latestScore = latestScore;
        this.highestScore = highestScore;
    }

    public String getUserName() {
        return userName;
    }

    public Integer getLatestScore() {
        return latestScore;
    }

    public Integer getHighestScore() {
        return highestScore;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setMailId(String mailId) {
        this.mailId = mailId;
    }

    public void setLatestScore(Integer latestScore) {
        this.latestScore = latestScore;
    }

    public void setHighestScore(Integer highestScore) {
        this.highestScore = highestScore;
    }
}
