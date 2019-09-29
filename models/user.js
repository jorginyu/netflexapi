module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
          idUsers: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true
          },
          username: DataTypes.STRING,
          email: DataTypes.STRING,
          passwd: DataTypes.STRING
     }, { tableName: 'users' /* ,timestamps: false */ });
     return User;
};