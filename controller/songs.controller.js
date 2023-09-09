
import SongModel from '../models/song.js'

class SongsController {
    async getSongs(req, res) {
        try {
            const songs = await SongModel.find()
            res.json(songs)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось найти песню"
            })
        }
    }
    async getSongAccount(req, res) {
        try {
            const _id = req.params.id
            const songs = await SongModel.find({authorLink: _id})
            res.json(songs)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось найти песню"
            })
        }
    }
    async getSongsParams(req, res) {
        try {
            const genre = req.params.genre
            const songs = await SongModel.find({genres: genre})
            
            res.json(songs)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось найти песню"
            })
        }
    }
    async getSongID(req, res) {
        try {
            const _id = req.params.id

            const song = await SongModel.findOne({_id})
            res.json(song)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось найти песню"
            })
        }
    }
    async getAllSong(req, res) {
        try {
            const songs = await SongModel.find()
            res.json(songs)

        } catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Не удалось найти песню"
            })
        }
    }
}

export default new SongsController()