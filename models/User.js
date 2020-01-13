module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    user_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_title: type.STRING,
	  user_firstname: type.STRING,
    user_lastname: type.STRING,
    user_email: type.STRING,
    user_password: type.STRING
  })
}
