const express = require('express')
const Playlist = require('./models/playlist')
const app = express()

app.get('/api/playlists', (request, response) => {
    Playlist.findAll().then((playlists) => {
        response.json(playlists)
    })
});

app.get('/api/playlists/:id', (request, response) => {
    let {id} = request.params

    Playlist.findByPk(id).then((playlist) => {
        if(playlist) {
            response.json(playlist)
        } else {
            response.status(404).send()
        }
    })
});

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});