import {INTEGER, STRING} from 'sequelize';

export default (sequelize, DataTypes) =>   {
  const Machine = sequelize.define('Machine', {
      id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
        type: STRING,
        unique: true,
        allowNull: false
      }
  },{
      timestamp: true
  });

  
  return Machine;
};
