module.exports = (sequelize, type) => {
  return sequelize.define('exam', {
    exam_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    que_id: type.INTEGER,
    choice_id: type.INTEGER,
    exam_description: type.STRING
  })
}
