module.exports = function (sequelize, DataTypes) {
	var Rock = sequelize.define('Rock', {
		message: {
			type: DataTypes.STRING,
		},
		poster: {
			type: DataTypes.STRING,
		},
		duplicate: {
			type: DataTypes.BOOLEAN
		}
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Rock;
};
