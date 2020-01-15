module.exports = (sequelize, type) => {
  console.log("q model")
  return sequelize.define('question', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
	  options: type.STRING, // JSON value like {"first":1,"second":0,"third":0,"fourth":0} where 1 means correct option
    description: type.STRING
  })
}
