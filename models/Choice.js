module.exports = (sequelize, type) => {
  return sequelize.define('choice', {
    choice_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    choice_title: type.STRING,
	  choice_related_info: type.STRING,
    choice_description: type.STRING
  })
  .belongsTo(Question_Choice, {through: 'choice_id'})
}
