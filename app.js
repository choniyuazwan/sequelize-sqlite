const express = require('express')
const Playlist = require('./models/playlist')
const Sequelize = require('sequelize')

const {Op} = Sequelize

const app = express()

app.get('/api/playlists', (request, response) => {
    let filter = {}
    let {q} = request.query

    if(q) {
        filter = {
            where: {
                name: {
                    [Op.like] : `${q}%`
                }        
            }
        }
    }

    Playlist.findAll(filter).then((playlists) => {
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