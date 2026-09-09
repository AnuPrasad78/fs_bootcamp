import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import userModel from './user.js';
import eventModel from './event.js';
import attendeeModel from './attendee.js';

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host:config.host,
        dialect:config.dialect,  
        port:3307,
        logging:config.logging  }
);

const db={}; //obj to hold seq instance and db model


db.Sequelize=Sequelize;
db.sequelize=sequelize;

//initialise models
db.User = userModel(sequelize, Sequelize);
db.Event = eventModel(sequelize, Sequelize);
db.Attendee = attendeeModel(sequelize, Sequelize);

//user has many attendee, events
db.User.hasMany(db.Event,{as:'events', foreignKey:'userId'});
db.User.hasMany(db.Attendee,{as:'attendee', foreignKey:'userId'});

db.Event.hasMany(db.Attendee,{as:'attendee', foreignKey:'eventId'});
db.Event.belongsTo(db.User,{as:'creator', foreignKey:'userId'});

db.Attendee.belongsTo(db.Event,{as:'event', foreignKey:'eventId'});
db.Attendee.belongsTo(db.User,{as:'creator', foreignKey:'userId'});

export default db;
