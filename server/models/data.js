module.exports = function (sequelize, DataTypes) {
	var Data = sequelize.define('Data', {
		first: {
			type: DataTypes.STRING,
		},
		last: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.TEXT('long')
		}
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Data;
};
