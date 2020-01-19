module.exports = (sequelize, type) => {
  return sequelize.define('site', {
    page_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    page_name: type.STRING,
    page_title: type.STRING,
    page_description: type.STRING,
    page_content: type.STRING
  })
}
