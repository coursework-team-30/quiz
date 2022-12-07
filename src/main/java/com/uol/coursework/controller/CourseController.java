package com.uol.coursework.controller;

import com.uol.coursework.model.LeaderboardScorer;
import com.uol.coursework.model.NewScore;
import com.uol.coursework.model.Quiz;
import com.uol.coursework.service.LeaderboardService;
import com.uol.coursework.service.QuesionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/quiz/")
public class CourseController {

    @Autowired
    private QuesionsService quizService;
    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/get10")
    public List<Quiz> getQuestions() {
        return quizService.get10Questions();
    }

    @GetMapping("/leaderboard")
    public List<LeaderboardScorer> getLeaderBoard() {
        return leaderboardService.getLeaderBoard();
    }

    @PostMapping("/add")
    public LeaderboardScorer addScore(@RequestBody NewScore score) {
        return leaderboardService.addScoreToLeaderboard(score);
    }
}
