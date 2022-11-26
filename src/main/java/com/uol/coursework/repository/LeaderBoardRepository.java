package com.uol.coursework.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LeaderBoardRepository extends CrudRepository<Leaderboard, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM leaderboard ORDER BY highest_score DESC LIMIT 10;")
    List<Leaderboard> getTopScores();

    @Query(nativeQuery = true, value = "select * from Leaderboard where user_name = ?1")
    Leaderboard getRow(String userName);
}
