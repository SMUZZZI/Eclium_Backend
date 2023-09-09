import Router from "express"

const router = new Router()

import songController from "../controller/songs.controller.js"

router.get("/songs", songController.getSongs)
router.get("/songs-genre/:genre", songController.getSongsParams)
router.get("/songs/:id", songController.getSongID)
router.get("/songs", songController.getAllSong)
router.get("/song/:id", songController.getSongAccount)

export default router