package com.uol.coursework.service;

import com.uol.coursework.model.LeaderboardScorer;
import com.uol.coursework.model.NewScore;
import com.uol.coursework.repository.LeaderBoardRepository;
import com.uol.coursework.repository.Leaderboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class LeaderboardService {

    @Autowired
    private LeaderBoardRepository leaderBoardRepository;

    public List<LeaderboardScorer> getLeaderBoard() {

        return leaderBoardRepository.getTopScores()
                .stream()
                .map(row -> new LeaderboardScorer(row.getUserName(), row.getLatestScore(), row.getHighestScore())).toList();
    }

    @Transactional
    public LeaderboardScorer addScoreToLeaderboard(NewScore score) {
        var record = leaderBoardRepository.getRow(score.getUserName());
        if (record == null) {
            Leaderboard data = new com.uol.coursework.repository.Leaderboard();
            data.setMailId(score.getEmail());
            data.setUserName(score.getUserName());
            data.setLatestScore(score.getScore());
            data.setHighestScore(score.getScore());

            leaderBoardRepository.save(data);
            record = leaderBoardRepository.getRow(score.getUserName());
        } else {
            if (score.getScore() > record.getHighestScore()) {
                record.setHighestScore(score.getScore());
                record.setLatestScore(score.getScore());
            } else {
                record.setLatestScore(score.getScore());
            }
            leaderBoardRepository.save(record);
        }
        return new LeaderboardScorer(record.getUserName(), record.getLatestScore(), record.getHighestScore());
    }
}
