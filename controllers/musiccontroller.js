let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const music = require('../models/music');
const Music = require('../db').import('../models/music');

// router.get('/practice', validateSession, function(req, res) {
//     res.send('Hey! This is a practice route!')
// })

router.post('/create', validateSession, (req, res) => {
const songPost = {
    song: req.body.music.song,
    artist: req.body.music.artist,
    album: req.body.music.album,
    text: req.body.music.text,
    rating: req.body.music.rating,
    owner: req.user.id
}
Music.create(songPost)
.then(music => res.status(200).json(music))
.catch(err => res.status(500).json({ error: err }))
});

router.get('/', validateSession, (req, res) => {
    const userid = req.user.id;
    Music.findAll({
        where: {owner: userid}
    })
    .then(music => res.status(200).json(music))
    .catch(err => res.status(500).json({ error: err }))
});

// router.get('/:title', validateSession, (req, res) => {
//     let title = req.params.title;

//     Music.findAll({
//         where: {title: title}
//     })
//     .then(music => res.status(200).json(music))
//     .catch(err => res.status(500).json({ error: err }))
// });

router.put('/:id', validateSession,  (req, res) => {
    const updateSong = {
    song: req.body.music.song,
    artist: req.body.music.artist,
    album: req.body.music.album,
    text: req.body.music.text,
    rating: req.body.music.rating
    };
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Music.update(updateSong, query)
    .then((music) => res.status(200).json(music))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete('/:id', validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Music.destroy(query) 
    .then(() => res.status(200).json({message: 'Song was destroyed'}))
    .catch((err) => res.status(500).json({ error: err }));
});



module.exports = router;