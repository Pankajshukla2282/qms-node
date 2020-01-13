module.exports = (sequelize, type) => {
  console.log("ex model")
  return sequelize.define('exam', {
    ex_pid: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    exam_id: type.INTEGER,
    que_ch_id: type.INTEGER,
    exam_status: type.INTEGER,
    exam_description: type.STRING
  })
}
