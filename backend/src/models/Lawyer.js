import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Lawyer = sequelize.define('Lawyer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    hooks: {
      beforeSave: (lawyer) => {
        if (lawyer.name) {
          lawyer.name = lawyer.name.toLowerCase();
        }
      }
    }
  });

  return Lawyer;
};
