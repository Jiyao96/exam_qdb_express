const Pool = require('pg').Pool
const pool = new Pool({
    user: 'xy',
    host: 'localhost',
    database: 'exam_qdb',
    password: '101302',
    port: 5432,
  })

//get all questions
const getQuestion = (request, response) => {
    pool.query('SELECT id,question_num,url,avg,std_dev,correlation FROM questions ORDER BY id ASC', (error, results) =>{
        if (error) {
        throw error
    }
    response.status(200).json(results.rows)
})
}

//get one question by id
const getQuestionById = (request, response) => {
    const id = parseInt(request.params.id)
    //console.log(`ID: ${id}`)
    pool.query('SELECT id,question_num,url,avg,std_dev,correlation FROM questions WHERE id = $1', [id], (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

//get questions within a range of years
const getQuestionByYear = (request, response) => {
    const minYear = parseInt(request.params.minYear)
    const maxYear = parseInt(request.params.maxYear)
    //console.log(`minYear: ${minYear}`)
    //console.log(`maxYear: ${maxYear}`)
    pool.query('SELECT q.id,q.question_num,q.url,q.avg,q.std_dev,q.correlation FROM questions q, exams e WHERE q.exam_id=e.id and e.year>=$1 and e.year<=$2',[minYear,maxYear],(error,results)=> {
            if (error){
               throw error;
            }
            response.status(200).json(results.rows);
    })
}

//get questions within a range of average score
const getQuestionByAvg = (request, response) => {
    const minAvg = parseInt(request.params.minAvg)
    const maxAvg = parseInt(request.params.maxAvg)
    pool.query('SELECT id,question_num,url,avg,std_dev,correlation FROM questions WHERE Avg >= $1 and Avg<= $2',[minAvg,maxAvg],(error,results)=> {
            if (error){
               throw error;
            }
            response.status(200).json(results.rows);
    })
}

//get questions by topics
const getQuestionByTopic = (request, response) => {
    const topicId = parseInt(request.params.topicId)
    pool.query('SELECT id,question_num,url,avg,std_dev,correlation FROM questions WHERE $1 = ANY(topic_id)', [topicId], (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

//get questions by term
const getQuestionByTerm = (request, response) => {
    const term = request.params.term
    pool.query('SELECT q.id,q.question_num,q.url,q.avg,q.std_dev,q.correlation FROM questions q, exams e WHERE q.exam_id=e.id and e.term=$1', [term], (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

//get questions by course
const getQuestionByCourse = (request, response) => {
    const course = request.params.course
    pool.query('SELECT q.id,q.question_num,q.url,q.avg,q.std_dev,q.correlation FROM questions q, exams e, courses c WHERE q.exam_id=e.id and e.course_id=c.id and c.name=$1', [course], (error, results) => {
        if (error){
               throw error;
        }
        response.status(200).json(results.rows);
    })
}

//get exam statistics by question id
const getExamStatistics = (request, response) => {
    const questionId = parseInt(request.params.questionId)
    //console.log(`ID: ${id}`)
    pool.query('SELECT DISTINCT e.avg,e.min,e.max,e.std_dev FROM questions q,exams e WHERE q.id = $1 and q.exam_id=e.id', [questionId], (error, results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

//search bar utility
//...

const getExam = (request, response) => {
    pool.query('SELECT * FROM exams ORDER BY id ASC', (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCourse = (request, response) => {
    pool.query('SELECT * FROM courses ORDER BY id ASC', (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getTopic = (request, response) => {
    pool.query('SELECT * FROM topics ORDER BY id ASC', (error, results) =>{
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//post queries
const createQuestion = (request, response) => {
    const {topic_id, exam_id, question_num, url, avg, std_dev, correlation} = request.body
    pool.query('INSERT INTO questions(topic_id, exam_id, question_num, url, avg, std_dev, correlation) VALUES ($1, $2, $3, $4, $5, $6, $7)', [topic_id, exam_id, question_num, url, avg, std_dev, correlation], (error, result) => {
        if (error){
            throw error
        }
        response.status(201).send(`Question Added.`)
    })
}

const createExam = (request, response) => {
    const {exam_name, description, course_id, year, term, avg, min, max, std_dev} = request.body
    pool.query('INSERT INTO exams (exam_name, description, course_id, year, term, avg, min, max, std_dev) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[exam_name,description,course_id,year,term,avg,min,max,std_dev],(error,result)=>{
        if(error){
            throw error
        }
        response.status(201).send(`Exam Added.`)
    })
}

const createTopic = (request, response) => {
    const {name} = request.body
    pool.query('INSERT INTO topics (name) VALUES ($1)', [name], (error, result) => {
        if (error){
            throw error
        }
        response.status(201).send(`Topic Added.`)
    })
}

const createCourse = (request, response) => {
    const {name, instructors} = request.body
    pool.query('INSERT INTO courses (name, instructors) VALUES ($1, $2)', [name, instructors], (error, result) => {
            if (error){
               throw error
            }
            response.status(201).send(`Course Added.`)
    })
}

//put queries
const updateQuestion = (request, response) => {
    const id = parseInt(request.params.id)
    const {topic_id, exam_id, question_num, url, avg, std_dev, correlation} = request.body
    pool.query('UPDATE questions SET topic_id=$1, exam_id=$2, question_num=$3, url=$4, avg=$5, std_dev=$6, correlation=$7 WHERE id=$8', [topic_id, exam_id, question_num, url, avg, std_dev, correlation, id], (error, result) => {
            if (error){
               throw error
            }
            response.status(201).send(`Question modified.`)
    })
}

const updateExam = (request, response) => {
    const id = parseInt(request.params.id)
    const {exam_name, description, course_id, year, term, avg, min, max, std_dev} = request.body
    pool.query('UPDATE exams SET exam_name=$1, description=$2, course_id=$3, year=$4, term=$5, avg=$6, min=$7, max=$8, std_dev=$9 WHERE id=$10',[exam_name,description,course_id,year,term,avg,min,max,std_dev,id],(error,result)=>{
            if(error){
               throw error
            }
            response.status(200).send(`Exam modified.`)
    })
}

const updateTopic = (request, response) => {
    const id = parseInt(request.params.id)
    const {name} = request.body
    pool.query('UPDATE topics SET name=$1 WHERE id=$2', [name,id], (error, result) => {
            if (error){
               throw error
            }
            response.status(200).send(`Topic modified.`)
    })
}

const updateCourse = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, instructors} = request.body
    pool.query('UPDATE courses SET name=$1, instructors=$2 WHERE id=$3', [name, instructors,id], (error, result) => {
            if (error){
               throw error
            }
            response.status(200).send(`Course modified.`)
    })
}


/*
const updateQuestion = (request, response) => {
    const id = parseInt(request.params.id)
    const { link, year } = request.body
  
    pool.query(
      'UPDATE questions SET link = $1, year = $2 WHERE id = $3',
      [link, year, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Question modified with ID: ${id}`)
      }
    )
  }

const deleteQuestion = (request, response) => {
    const id = request.params.id

    pool.query('DELETE FROM questions WHERE id = $1', [id], (error, result) => {
        if (error){
            throw error
        }
        response.status(200).send(`Question deleted with ID: ${id}`)
    })
}
*/

module.exports = {
    //inspect questions
    getQuestion,
    getQuestionById,
    getQuestionByYear,
    getQuestionByAvg,
    getQuestionByTopic,
    getQuestionByTerm,
    getQuestionByCourse,
    //utilities
    getExam,
    getCourse,
    getTopic,
    getExamStatistics,
    //insert into database
    createQuestion,
    createExam,
    createCourse,
    createTopic,
    //update questions
    updateQuestion,
    updateExam,
    updateCourse,
    updateTopic,
    //delete questions
}
