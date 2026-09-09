
export default (sequelize, DataTypes) => {
    const Attendee = sequelize.define('Attendee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
            name: {
            type: DataTypes.STRING,
            allowNull: false},
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,}},
        password: {
            type: DataTypes.STRING,
            allowNull: false,
           },
           
           
    });
   
    return Attendee;
};