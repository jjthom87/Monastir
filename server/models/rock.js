module.exports = function (sequelize, DataTypes) {
	var Rock = sequelize.define('Rock', {
		message: {
			type: DataTypes.STRING,
		},
		poster: {
			type: DataTypes.STRING,
		}
  }, {
    classMethods: {
      associate: function(models) {
      	Rock.belongsTo(models.Data)
        Rock.belongsTo(models.User)
      }
    }
  });
  return Rock;
};
