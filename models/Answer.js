module.exports = (sequelize, type) => {
  return sequelize.define('question_choice', {
    que_ch_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    que_id: type.INTEGER,
	  choice_id: type.INTEGER,	
	  que_ch_status: {
      type: type.INTEGER,
      enum : [0,1],
      default: 1
    }
  })
}
