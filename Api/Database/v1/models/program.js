'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };

  Program.init({
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    program_name: {
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
    modelName: 'Program',
    tableName: "program",
    timestamps: true,
    paranoid: true, 
    underscored: true, 
  });

  return Program;
};
