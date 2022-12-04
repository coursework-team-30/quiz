package com.uol.coursework.quiz;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uol.coursework.controller.CourseController;
import com.uol.coursework.repository.Questions;
import com.uol.coursework.repository.QuestionsRepository;
import com.uol.coursework.service.QuesionsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
public class QuestionsServiceTest {
    @Autowired
    private CourseController controller;

    @Autowired
    private QuesionsService quesionsService;

    @MockBean
    private QuestionsRepository questionsRepository;

    @Test
    public void testControllerNotNull() {
        assertThat(controller).isNotNull();
    }

    @Test
    public void testQuestionServiceNotNull() {
        assertThat(quesionsService).isNotNull();
    }

    @Test
    public void testQuestionsRepository() {
        assertThat(questionsRepository).isNotNull();
    }

    @Test
    public void testGet10Questions() {
        var questions = this.prepare10Questions();
        when(questionsRepository.find10Questions()).thenReturn(questions);

        var response = controller.getQuestions();
        assertThat(response).isNotNull();
        assertThat(response.size()).isEqualTo(10);
    }

    private List<Questions> prepare10Questions() {
        List<Questions> data;
        try {
            String testFile = "src/main/resources/test-data/questions.json";
            String json = new String(Files.readAllBytes(Paths.get(testFile)));
            final ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            Questions[] temp = objectMapper.readValue(json, Questions[].class);
            data = new ArrayList(Arrays.asList(temp));
            return data;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
