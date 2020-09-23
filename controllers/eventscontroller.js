const router = require("express").Router();
const Events = require("../db").import("../models/events");
// const validateSession = require("../middleware/vaildate-session");
const sequelize = require("../db");

router.post("/create", (req, res) => {
    const dateConversion = new Date(req.body.date);
    const eventsLog = {
        date: dateConversion,
        artist: req.body.artist,
        location: req.body.location,
        time: req.body.time,
        link: req.body.link,
        owner: req.user.id
    }; 
    Events.create(eventsLog)
        .then(events => res.status(200).json(events))
        .catch(err => res.status(500).json({error: err}));
});

router.get("/all", (req, res) => {
    let userid = req.user.id
    Events.findAll({
        where: {owner: userid},
        order: [['date', 'DESC']]
    })
    .then(entries => res.status(200).json(entries))
    .catch(err => res.status(500).json({error: err}))
})

router.post("/search-dates", (req, res) => {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    const query = {
        text: `SELECT * from entries WHERE owner = '${req.user.id}' AND date BETWEEN '${req.body.startDate}' and '${req.body.endDate}' ORDER BY date ASC`
    }
    sequelize.query(query.text).then(entries => res.status(200).json(entries[0])).catch(err => res.status(500).json({error: err}))
})

router.put("/update/:id", (req, res) => {
    const dateConversion = new Date(req.body.date);
    const updateEntryLog = {
        date: dateConversion,
        artist: req.body.artist,
        location: req.body.location,
        time: req.body.time,
        link: req.body.link,
        owner: req.user.id
    };
    const query = {
        where:{
            id: req.params.id, owner: req.user.id
        }
    };
    Entry.update(updateEntryLog, query)
        .then((entries) => res.status(200).json(entries))
        .catch((err) => res.status(500).json({error:err}));
});

router.delete("/delete/:id", (req, res) => {
    const query = {
        where: {
            id: req.params.id, owner: req.user.id
        }
    };
    Entry.destroy(query)
        .then(() => res.status(200).json({message: "Event Deleted!"}))
        .catch((err) => res.status(500).json({error: err}));
});

module.exports = router;