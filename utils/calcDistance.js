const {
  getDistanceBetweenTwoPoints,
} = require("calculate-distance-between-coordinates");

module.exports = (coordUser, coordEntry) => {
  const user = {
    lat: coordUser.split(",")[0] * 1,
    lon: coordUser.split(",")[1] * 1,
  };

  const event = {
    lat: coordEntry.split(",")[0] * 1,
    lon: coordEntry.split(",")[1] * 1,
  };

  const distance = getDistanceBetweenTwoPoints(user, event);

  return distance < 1 ? 1 : distance;
};
