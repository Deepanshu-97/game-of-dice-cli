import boxen from "boxen";

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  backgroundColor: "#555555",
};

export const msgBox = (message, alert = false) => {
  if (alert) boxenOptions.borderColor = "red";
  else boxenOptions.borderColor = "green"
  const msgBox = boxen(message, boxenOptions);
  console.log(msgBox);
};
