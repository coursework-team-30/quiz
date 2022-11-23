package com.uol.coursework.repository;

import javax.persistence.*;

@Entity
@Table(schema = "leaderboard")
public class LeaderBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
}
