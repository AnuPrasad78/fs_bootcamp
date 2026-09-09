import express from 'express';
import db from '../models/index.js';
import auth from '../middleware/auth.js'


const router = express.Router();


router.get('/', async (req, res) => {
    try {
       
        const events = await db.Event.findAll({
           include: [
                { model: db.User, as: 'creator', attributes: ['id', 'name'] },// only fetch the id and name from the user table
                { model: db.Attendee, as: 'attendee' },
            ],
           order: [['date', 'ASC']]
        });

        res.json(events);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const event = await db.Event.create({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json(event);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})



router.get('/filter', async (req, res) => {
    try {
        const { date, location } = req.query;
        const where = {};

        if (date) {
            where.date = {
                [db.Sequelize.Op.gte]: new Date(date)
            };
        }

        if (location) {
            where.location = {
                [db.Sequelize.Op.like]: `%${location}%`
            };
        }

        const events = await db.Event.findAll({
            where,
            include: [
                { model: db.User, as: 'creator', attributes: ['id', 'name'] },// only fetch the id and name from the user table
                { model: db.Attendee, as: 'attendee' },
            ],
            order: [['date', 'ASC']]
        });
        res.json(events);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});




// RSVP to event 
router.post('/:id/rsvp', auth, async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await db.Event.findByPk(eventId)

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const attendee = await db.Attendee.create({
            ...req.body,
            eventId: eventId,
            userId: req.user.id
        });

        res.status(201).json(attendee);

    } catch (error) {
        res.status(400).json({ error: error.message });

    }
});


export default router;