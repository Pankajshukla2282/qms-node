const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mariadb',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)
const Question_ChoiceModel = require('./models/Question_Choice')
const Question_Choice = Question_ChoiceModel(sequelize, Sequelize)
const QuestionModel = require('./models/Question')
const Question = QuestionModel(sequelize, Sequelize)
const ChoiceModel = require('./models/Choice')
const Choice = ChoiceModel(sequelize, Sequelize)
const UserModel = require('./models/User')
const User = UserModel(sequelize, Sequelize)
const AnswerModel = require('./models/Answer')
const Answer = AnswerModel(sequelize, Sequelize)
const ExamModel = require('./models/Exam')
const Exam = ExamModel(sequelize, Sequelize)
const SiteModel = require('./models/Site')
const Site = SiteModel(sequelize, Sequelize)
const Models = { Question, Choice, User, Answer, Exam, Site, Question_Choice }
//const Models = { Question }
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.')
    return Models
  }

  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log('=> Created a new connection.')
  return Models
}
