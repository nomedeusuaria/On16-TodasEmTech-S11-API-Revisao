const Games = require("../src/models/gamesModel");

describe("Teste do modelo de games", () => {
    const games = new Games({
        id: 4,
        title: "The Legend of Zelda: A Link to the past",
        launchYear: "1992",
        consoles: [
            "superNintendo",
        ],
        liked: true   
    });
    it("Deve retornar um novo game", () => {
        expect(games.title).toBe("The Legend of Zelda: A Link to the past");
    });
    it("Deve salvar no banco que não existe o novo jogo", () => {
        games.save().then((dados) => {
            expect(dados.title).toBe("The Legend of Zelda: A Link to the past");
        });
    });
});