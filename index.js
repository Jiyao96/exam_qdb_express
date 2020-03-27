const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3003
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/', (request, response) => {
    response.json({info: 'Node.js and postgres.js'})
})
//question queries
app.get('/question', db.getQuestion)
app.get('/question/:id', db.getQuestionById)
app.get('/question/year/:minYear/:maxYear', db.getQuestionByYear)
app.get('/question/average/:minAvg/:maxAvg',db.getQuestionByAvg)
app.get('/question/topics/:topicId',db.getQuestionByTopic)
app.get('/question/term/:term', db.getQuestionByTerm)
app.get('/question/course/:course', db.getQuestionByCourse)
//utility queries
app.get('/exam', db.getExam)
app.get('/course',db.getCourse)
app.get('/topic',db.getTopic)
app.get('/exam/statistics/:questionId', db.getExamStatistics)
//search bar
//...
//post queries
app.post('/question',db.createQuestion)
app.post('/exam',db.createExam)
app.post('/course',db.createCourse)
app.post('/topic',db.createTopic)
//put queries
app.put('/question/:id',db.updateQuestion)
app.put('/exam/:id',db.updateExam)
app.put('/course/:id',db.updateCourse)
app.put('/topic/:id',db.updateTopic)
//app.put('/questions/:id',db.updateQuestion)
//app.delete('/questions/:id', db.deleteQuestion)

app.listen(port, () => {
    console.log(`App running on port ${port} `)
  })
