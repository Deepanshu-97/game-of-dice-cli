import prompts from "prompts";
import playerShuffle from "../utils/playerShuffle";
import gameRound from "../utils/gameRound";
import playerRank from "../utils/playerRank";
import { msgBox } from "../view/box";

(async () => {
  msgBox("Hello Players, Are You Ready for the DICE GAME?");
  let players = [];
  try {
    let prompt = await prompts([
      {
        type: "confirm",
        name: "value",
        message: "Should we start the game",
        initial: true,
      },
    ]);
    if (!prompt.value) return;

    prompt = await prompts([
      {
        type: "autocomplete",
        name: "playersCount",
        message: "Select the number of players",
        choices: [
          { title: "2" },
          { title: "3" },
          { title: "4" },
          { title: "5" },
        ],
        required: true,
      },
    ]);
    let playersCount = Number(prompt.playersCount);

    for (let player = 1; player <= playersCount; player++) {
      const newPlayer = {
        name: `Player-${player}`,
        totalScore: 0,
        lastScore: 0,
        skip: false,
        rank: 1,
      };
      players.push(newPlayer);
    }
    let playerWon = [];

    playerRank(players, playerWon);
    prompt = await prompts([
      {
        type: "number",
        name: "winPoints",
        message: "Select the win score",
        required: true,
        initial: 10
      },
    ]);
    let winPoints = Number(prompt.winPoints);
    msgBox("Let the game begin ladies and gentelman");
    playerShuffle(players);
    gameRound(players, winPoints, playerWon);
  } catch (error) {
    msgBox(error.message, true);
  }
})();
