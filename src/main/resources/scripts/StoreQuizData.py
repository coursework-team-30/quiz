# Module Imports
import mariadb
import sys
import json

# Connect to MariaDB Platform
try:
    conn = mariadb.connect(
        user="root",
        password="pass",
        host="127.0.0.1",
        port=3308,
        database="quiz_app_db"
    )

except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

# Get Cursor
cur = conn.cursor()
tableName = "questions"

# get the questions
jsonFile = "questions.json"
questionsFile = open(jsonFile, "r")
questionsData = json.loads(questionsFile.read())

# Insert the questions into the questions table of the quiz_app_db
for q in questionsData:
    # Category, Question
    category, question = q['category'], q['question']
    # Correct Answer
    correct_answer = q['correctAnswer']
    # Incorrect Answers
    incorrect_answers = q['incorrectAnswers']
    incorrect_answer1 = incorrect_answers[0]
    incorrect_answer2 = incorrect_answers[1]
    incorrect_answer3 = incorrect_answers[2]
    print(incorrect_answer2)
    # QUestion Type, Identity of question
    question_type, identifier = q['type'], q['id']
    # difficulty of question
    difficulty = "No Difficulty"
    if q.get('difficulty') is not None:
        difficulty = q['difficulty']
    # print(category, "  |  ", question, "  |  ", correct_answer, "  |  ",
        #   str(incorrect_answers), "  |  ", question_type, "  |  ", difficulty, "  |  ", identifier)
    cur.execute("insert into questions(category, question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, question_type, difficulty, identifier) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (category, question, correct_answer, str(incorrect_answer1), str(incorrect_answer2), str(incorrect_answer3), question_type, difficulty, identifier))


# cur.execute("select * from questions;")
# count = 0
# for t in cur:
#     count += 1
#     print(count)

conn.commit()

conn.close()
