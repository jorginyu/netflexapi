module.exports = (sequelize, DataTypes) => {
     const Token = sequelize.define('Token', {
          token: DataTypes.STRING,
          user: DataTypes.STRING
     }, { tableName: 'tokens',timestamps: false}
     );

     return Token;
};