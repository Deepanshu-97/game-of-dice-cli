import playerRank from "./playerRank";
import rollDice from "./rollDice";
import { msgBox } from "../view/box";

export default async function gameRound(players, winPoints, playersWon) {
  for (let player of players) {
    player = await rollDice(player, winPoints);
    if (player.totalScore >= winPoints) {
      player.rank = playersWon.length + 1;
      playersWon.push(player);
      msgBox(
        ` Congratulations! ${player.name} have completed the final score and secured the rank of ${player.rank}`
      );
    }
  }
  players = players.filter((player) => {
    return player.totalScore < winPoints;
  });

  playerRank(players, playersWon);
  if (players.length) {
    await gameRound(players, winPoints, playersWon);
  }
}
