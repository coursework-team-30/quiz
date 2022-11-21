import requests as req
import json

limit = 50
categories = ["arts_and_literature", "film_and_tv", "food_and_drink", "general_knowledge",
              "geography", "history", "music", "science", "society_and_culture", "sport_and_leisure"]

allQuestions = []

for category in categories:
    categoryData = req.get(
        "https://the-trivia-api.com/api/questions?categories={0}&limit={1}".format(category, limit)).json()
    # Add all questions
    for questionData in categoryData:
        allQuestions.append(questionData)

questionJsonFile = open("questions1.json", "w+")
questionJsonFile.write(json.dumps(allQuestions))

for question in allQuestions:
    print(question['correctAnswer'])
