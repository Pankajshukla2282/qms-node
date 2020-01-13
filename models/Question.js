module.exports = (sequelize, type) => {
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
}
