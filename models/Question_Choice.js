module.exports = (sequelize, type) => {
    console.log("ex Question_Choice")
    return sequelize.define('question_choice', {
      que_ch_id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      que_id: type.INTEGER,
      choice_id: type.INTEGER,
      que_ch_status: type.INTEGER
    })
    .belongsTo(Exam, {through: 'que_ch_id'})
  }
  