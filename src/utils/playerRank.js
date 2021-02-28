import Table from "cli-table";

export default function playerRank(players, playersWon) {
  let winningTable = new Table({
    head: ["Won Player Name", "Total Score", "Rank"],
    colWidths: [25, 25, 10],
  });
  for (let player of playersWon) {
    winningTable.push([player.name, player.totalScore, player.rank]);
  }

  if (playersWon.length) console.log(winningTable.toString());

  if (players.length) {
    let sortedPlayers = players.slice(0);
    sortedPlayers.sort(function (a, b) {
      return b.totalScore - a.totalScore;
    });

    let numTies = 0;
    sortedPlayers[0].rank = playersWon.length + 1;
    for (let i = 1; i < sortedPlayers.length; i++) {
      if (sortedPlayers[i].totalScore === sortedPlayers[i - 1].totalScore) {
        numTies++;
        sortedPlayers[i].rank = sortedPlayers[i - 1].rank;
      } else {
        sortedPlayers[i].rank = sortedPlayers[i - 1].rank + 1 + numTies;
        numTies = 0;
      }
    }
    let activeTable = new Table({
      head: ["Active Player Name", "Total Score", "Rank"],
      colWidths: [25, 25, 10],
    });
    for (let player of sortedPlayers) {
      activeTable.push([player.name, player.totalScore, player.rank]);
    }
    console.log(activeTable.toString());
  }
  return players;
}
