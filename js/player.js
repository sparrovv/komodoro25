
KP.Player = (function() {

  function Player(extensionUrl) {
    this.extensionUrl = extensionUrl;
    this.snd = new Audio("" + this.extensionUrl + "/assets/tick.wav");
  }

  Player.prototype.tick = function() {
    return this.snd.play();
  };

  return Player;

})();
