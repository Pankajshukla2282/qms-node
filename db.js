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
const QuestionModel = require('./models/Question')
const ChoiceModel = require('./models/Choice')
const UserModel = require('./models/User')
const AnswerModel = require('./models/Answer')
const ExamModel = require('./models/Exam')
const SiteModel = require('./models/Site')
const Question = QuestionModel(sequelize, Sequelize)
const Choice = ChoiceModel(sequelize, Sequelize)
const User = UserModel(sequelize, Sequelize)
const Answer = AnswerModel(sequelize, Sequelize)
const Exam = ExamModel(sequelize, Sequelize)
const Site = SiteModel(sequelize, Sequelize)
const Models = { Question, Choice, User, Answer, Exam, Site }
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
