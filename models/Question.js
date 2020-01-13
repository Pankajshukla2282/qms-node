module.exports = (sequelize, type) => {
  console.log("q model")
  return sequelize.define('question', {
    que_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    que_title: type.STRING,
	  que_related_info: type.STRING,
    que_description: type.STRING
  })
  .belongsTo(Question_Choice, {through: 'que_id'})
}
