import diceNumber from "./diceNumber";
import prompts from "prompts";
import { msgBox } from "../view/box";

export default async function rollDice(player, winPoints) {
  if (player.skip) {
    player.lastScore = 0;
    player.skip = false;
    return player;
  }
  await prompts([
    {
      type: "select",
      name: "rollADice",
      message: `${player.name} its your turn, Roll a dice`,
      choices: ["press enter"],
      required: true,
    },
  ]);
  let currentScore = diceNumber();

  player.totalScore = player.totalScore + currentScore;

  if (player.totalScore >= winPoints) {
    return player;
  }
  if (currentScore === 6) {
    msgBox(`HURRRAY ${player.name} got a 6, PLEASE ROLL AGAIN!!!`);
    player = await rollDice(player, winPoints);
  } else if (currentScore === 1 && player.lastScore === 1) {
    player.skip = true;
    msgBox(
      `OOOOPS!!, Hard Luck for ${player.name}, will be skipping a chance in the next round`,
      true
    );
  } else {
    msgBox(`${player.name} rolls a ${currentScore}`);
  }
  player.lastScore = currentScore;
  return player;
}
