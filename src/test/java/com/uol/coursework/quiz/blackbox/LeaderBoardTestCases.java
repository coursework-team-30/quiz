package com.uol.coursework.quiz.blackbox;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.coursework.controller.CourseController;
import com.uol.coursework.model.NewScore;
import com.uol.coursework.repository.LeaderBoardRepository;
import com.uol.coursework.repository.Leaderboard;
import com.uol.coursework.service.LeaderboardService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class LeaderBoardTestCases {
    @Autowired
    private CourseController controller;

    @Autowired
    private LeaderboardService leaderboardService;

    @MockBean
    private LeaderBoardRepository leaderBoardRepository;

    @Test
    public void testGetLeaderboardResponseNotNull() {
        List<Leaderboard> data = this.prepareLeaderboardData();

        when(leaderBoardRepository.getTopScores()).thenReturn(data);
        var response = leaderboardService.getLeaderBoard();
        assertThat(response).isNotNull();
    }

    @Test
    public void testAddScoreResponseNotNull() {
        var score = this.prepareScoreData();
        var newRecord = this.prepareLeaderboardRecord(score);
        when(leaderBoardRepository.getRow(any())).thenReturn(null).thenReturn(newRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        var response = controller.addScore(score);
        assertThat(response).isNotNull();
    }

    @Test
    public void testScoreIsValid() {
        var score = new NewScore("muzammil", "muzammil@gmail.com", 12);
        var newRecord = this.prepareLeaderboardRecord(score);
        when(leaderBoardRepository.getRow(any())).thenReturn(null).thenReturn(newRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        Assertions.assertThrows(IllegalArgumentException.class, () -> leaderboardService.addScoreToLeaderboard(score));
        var response = leaderboardService.addScoreToLeaderboard(score);
        assertThat(response).isNotNull();
    }

    @Test
    public void testEmailIsValid() {
        var score = new NewScore("muzammil", "muzammil", 9);
        var newRecord = this.prepareLeaderboardRecord(score);
        when(leaderBoardRepository.getRow(any())).thenReturn(null).thenReturn(newRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        Assertions.assertThrows(IllegalArgumentException.class, () -> leaderboardService.addScoreToLeaderboard(score));
    }

    private List<Leaderboard> prepareLeaderboardData() {
        List<Leaderboard> data;
        try {
            String testFile = "src/main/resources/test-data/leaderboardScores.json";
            String json = new String(Files.readAllBytes(Paths.get(testFile)));
            final ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Leaderboard[] temp = objectMapper.readValue(json, Leaderboard[].class);
            data = new ArrayList(Arrays.asList(temp));
            return data;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private NewScore prepareScoreData() {
        return new NewScore("muzammil", "muzammil@gmail.com", 8);
    }

    private Leaderboard prepareLeaderboardRecord(NewScore score) {
        return new Leaderboard(1L, score.getUserName(), score.getEmail(), score.getScore(), score.getScore());
    }
}
