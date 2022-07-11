const controller = require("../controller/gamesController")
const express = require("express")
const router = express.Router()

router.get("/", controller.getAllGames)
router.get("/:id", controller.getGameById)
router.post("/addGame", controller.addGame)
router.put("/:id", controller.updateGame)
//router.delete("/:id", controller.deleteGame)
router.patch("/:id/liked", controller.likedGame)

module.exports = router