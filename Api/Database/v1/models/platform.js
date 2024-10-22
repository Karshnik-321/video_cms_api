'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class Platform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };

  Platform.init({
    platform_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
	status: {
		type: DataTypes.ENUM('active', 'inactive'),
		defaultValue: 'active',
	},
	created_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	updated_at: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		onUpdate: DataTypes.NOW,
	},
	deleted_at: {
		type: DataTypes.DATE,
	},
  },
  {
    sequelize,
    modelName: 'Platform',
    tableName: "platform",
    timestamps: true,
    paranoid: true, 
    underscored: true, 
  });

  return Platform;
};
