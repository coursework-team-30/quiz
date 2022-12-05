package com.uol.coursework.quiz.whitebox;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.coursework.controller.CourseController;
import com.uol.coursework.model.NewScore;
import com.uol.coursework.repository.LeaderBoardRepository;
import com.uol.coursework.repository.Leaderboard;
import com.uol.coursework.service.LeaderboardService;
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
public class LeaderBoardServiceTest {
    @Autowired
    private CourseController controller;

    @Autowired
    private LeaderboardService leaderboardService;

    @MockBean
    private LeaderBoardRepository leaderBoardRepository;

    @Test
    void testLeaderboardAPI() {
        var response = controller.getLeaderBoard();
        assertThat(response).isNotNull();
    }

    @Test
    void testAddScoreAPI() {
        var score = this.prepareScoreData();
        var newRecord = this.prepareLeaderboardRecord(score);
        when(leaderBoardRepository.getRow(any())).thenReturn(null).thenReturn(newRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        var response = controller.addScore(score);
        assertThat(response).isNotNull();
        assertThat(response.getUserName()).isEqualTo(score.getUserName());
    }

    @Test
    public void checkLeaderBoardServiceForNull() {
        assertThat(leaderboardService).isNotNull();
    }

    @Test
    public void testGetLeaderboardScores() {
        List<Leaderboard> data = this.prepareLeaderboardData();

        when(leaderBoardRepository.getTopScores()).thenReturn(data);
        var response = leaderboardService.getLeaderBoard();
        assertThat(response.size()).isEqualTo(10);
    }

    @Test
    public void testAddNewScoreFirstTimeUser() {
        var score = this.prepareScoreData();
        var newRecord = this.prepareLeaderboardRecord(score);
        when(leaderBoardRepository.getRow(any())).thenReturn(null).thenReturn(newRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        var response = leaderboardService.addScoreToLeaderboard(score);
        assertThat(response).isNotNull();
        assertThat(response.getLatestScore()).isEqualTo(newRecord.getLatestScore());
        assertThat(response.getHighScore()).isEqualTo(newRecord.getHighestScore());
        assertThat(response.getUserName()).isEqualTo(newRecord.getUserName());
    }

    @Test
    public void testAddNewScoreExistingUserNewHighScore() {
        var score = this.prepareScoreData();
        var leaderboardRecord = new Leaderboard();
        leaderboardRecord.setUserName(score.getUserName());
        leaderboardRecord.setMailId(score.getEmail());
        leaderboardRecord.setLatestScore(5);
        leaderboardRecord.setHighestScore(6);

        when(leaderBoardRepository.getRow(any())).thenReturn(leaderboardRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        var response = leaderboardService.addScoreToLeaderboard(score);
        assertThat(response).isNotNull();
        assertThat(response.getLatestScore()).isEqualTo(score.getScore());
        assertThat(response.getHighScore()).isEqualTo(score.getScore());
    }

    @Test
    public void testAddNewScoreExistingUserLatestScore() {
        var score = this.prepareScoreData();
        var leaderboardRecord = new Leaderboard();
        leaderboardRecord.setUserName(score.getUserName());
        leaderboardRecord.setMailId(score.getEmail());
        leaderboardRecord.setLatestScore(5);
        leaderboardRecord.setHighestScore(9);

        when(leaderBoardRepository.getRow(any())).thenReturn(leaderboardRecord);
        when(leaderBoardRepository.save(any())).thenReturn(null);

        var response = leaderboardService.addScoreToLeaderboard(score);
        assertThat(response).isNotNull();
        assertThat(response.getLatestScore()).isEqualTo(score.getScore());
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
