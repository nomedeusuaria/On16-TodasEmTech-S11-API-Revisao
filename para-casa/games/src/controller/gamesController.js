const gamesCatalog = require("../models/games.json");
const fs = require("fs");

const getAllGames = (req, res) => {
  try {
    res.status(200).json([{ Games: gamesCatalog }]);
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
};

const getGameById = (req, res) => {
  const gameId = req.params.id;
  const gameFound = gamesCatalog.find((game) => game.id == gameId);
  if (gameFound) {
    res.status(200).send(gameFound);
  } else {
    res.status(404).send({ message: "Game not found" });
  }
};

const addGame = (req, res) => {
  const { title, launchYear, consoles, liked } = req.body;
  gamesCatalog.push({
    id: gamesCatalog.length + 1,
    title,
    launchYear,
    consoles,
    liked,
  });

  fs.writeFile("./src/models/games.json", JSON.stringify(gamesCatalog), "utf8", function (err) {
      if (err) {
        res.status(500).send({ Message: err });
      } else {
        console.log("Insert game sucessfully");
        const gameFound = gamesCatalog.find(
          (games) => games.id == gamesCatalog.length
        );
        res.status(200).send(gameFound);
      }
    }
  );
};

const updateGame = (req, res) => {
  try {
    const idRequest = req.params.id;
    const gameToUpdate = req.body;
    const gameFound = gamesCatalog.find((game) => game.id == idRequest);
    const gameIndex = gamesCatalog.indexOf(gameFound);

    if (gameIndex > -1) {
      gamesCatalog.splice(gameIndex, 1, gameToUpdate);
      fs.writeFile("./src/models/games.json", JSON.stringify(gamesCatalog), "utf8", function (err) {
          if (err) {
            res.status(500).send({ Message: err });
          } else {
            console.log("Updated game sucessfully");
            const gameFound = gamesCatalog.find(
              (games) => games.id == gamesCatalog.length
            );
            res.status(200).send(gameFound);
          }
        }
      );
    } else {
      res.status(404).send({ message: "Game not found to be updated!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error" });
  }
};

const likedGame = (req, res) => {
  try {
    const idGameRequest = req.params.id;
    const likedRequest = req.body.liked;
    const likedFound = gamesCatalog.find((game) => game.id == idGameRequest);
    const likedIndex = gamesCatalog.indexOf(likedFound);

    if (likedIndex != 0) {
      likedFound.liked = likedRequest;
      gamesCatalog.splice(likedIndex, 1, likedFound);
      fs.writeFile("./src/models/games.json", JSON.stringify(gamesCatalog), "utf8", function (err) {
          if (err) {
            res.status(500).send({ Message: err });
          } else {
            console.log("Your game has been changed!");

            const likedUpdated = games.find((game) => game.id == idGameReq);

            res.status(200).send(likedUpdated);
          }
        }
      );
    } else {
      res.status(404).send({ message: "Game not found." });
    }
  } catch (err) {
    res.status(500).send({ message: "Erro no server" });
  }
};

const deleteGame = (req, res) => {
    try {
        const idGameReq = req.params.id;
        const gameIndex = gamesCatalog.findIndex((game) => game.id == idGameReq)

        if(gameIndex != -1) {
            gamesCatalog.splice(gameIndex, 1)
            fs.writeFile("./src/models/games.json", JSON.stringify(gamesCatalog), 'utf8', function (err) {
                if (err) {
                    res.status(500).send({ message: err })
                } else {
                    console.log("Game deleted successfully")
                    res.sendStatus(204)
                }
            })
            res.status(200).json({
                message: "Game deleted successfully",
                "deleted game": idReq,
                games,
              });
            } else {
              res.status(404).json({
                message: "Game not found",
              });
            }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
}

module.exports = {
  getAllGames,
  addGame,
  getGameById,
  updateGame,
  likedGame,
  deleteGame
};