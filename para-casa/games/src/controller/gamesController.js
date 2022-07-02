const gamesCatalog = require('../models/games.json')
const fs = require('fs')

const getAllGames = (req, res) => {
    try{
        res.status(200).json([{ Games: gamesCatalog }])
    } catch (err) {
        res.status(500).send({message: "Error"})
    }
};

const getGameById = (req, res) => {
    const gameId = req.params.id
    const gameFound = gamesCatalog.find(game => game.id == gameId)
    if (gameFound) {
        res.status(200).send(gameFound)
    } else {
        res.status(404).send({ message: "Game not found" })
    }
};

const addGame = (req, res) => {
    const {title, launchYear, consoles, liked} = req.body
    gamesCatalog.push({id: gamesCatalog.length +1, title, launchYear, consoles, liked})

    fs.writeFile("./src/models/games.json", JSON.stringify(gamesCatalog), "utf8", function (err) {
        if(err){
            res.status(500).send({ Message: err})
        }else{
            console.log("Insert game sucessfully")
            const gameFound = gamesCatalog.find((games) => games.id == gamesCatalog.length)
            res.status(200).send(gameFound)
        }
    })
};

const updateGame = (req, res) => {
    try{
        const idRequest = req.params.id
        const gameToUpdate = req.body
        const gameFound = gamesCatalog.find((game) => game.id == idRequest)
        const gameIndex = gamesCatalog.indexOf(gameFound)

        if (gameIndex > -1){
            gamesCatalog.splice(gameIndex, 1, gameToUpdate)
            fs.writeFile("./src/models/games.json", JSON.stringify(gamesCatalog), "utf8", function (err) {
                if(err){
                    res.status(500).send({ Message: err})        
        }else{
            console.log("Updated game sucessfully")
            const gameFound = gamesCatalog.find((games) => games.id == gamesCatalog.length)
            res.status(200).send(gameFound)
        }
    }) } else {
        res.status(404).send({ message: "Game not found to be updated!" });
      }   
} catch (err){
    res.status(500).send({ message: "Error" });
}
};

module.exports = {
    getAllGames,
    addGame,
    getGameById,
    updateGame,

}