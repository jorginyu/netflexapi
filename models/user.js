module.exports = (sequelize, DataTypes) => {
     const User = sequelize.define('User', {
          username: DataTypes.STRING,
          email: DataTypes.STRING,
          passwd: DataTypes.STRING,
     }, { tableName: 'users', timestamps: false  });
     return User;
};