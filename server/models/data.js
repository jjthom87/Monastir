module.exports = function (sequelize, DataTypes) {
	var Data = sequelize.define('Data', {
		first: {
			type: DataTypes.STRING,
		},
		last: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING
		}
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Data;
};
