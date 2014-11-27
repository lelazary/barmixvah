var board, pump0, pump1, pump2, pump3, pump4;

var five = require('johnny-five');

board = new five.Board();
board.on('ready', function () {
  // Counting down pins because that's the orientation 
  // that my Arduino happens to be in
	
  pumpSwitch = new five.Led(0); 
	onPumps = 0;
  pump0 = new five.Led(1); //12
  pump1 = new five.Led(3); //10
  pump2 = new five.Led(5); //8
  pump3 = new five.Led(7); //5
  pump4 = new five.Led(9); //6
  pump5 = new five.Led(11);
  pump6 = new five.Led(13);
  pump7 = new five.Led(15);

  board.repl.inject({
    p0: pump0,
    p1: pump1,
    p2: pump2,
    p3: pump3,
    p4: pump4,
    p5: pump4
  });

	pumpSwitch.on();

  console.log("\033[31m[MSG] Bar Mixvah Ready\033[91m");
});

exports.pump = function (ingredients) {
  console.log("Dispensing Drink");
	pumpSwitch.off();
  for (var i in ingredients) {
    (function (i) {
      setTimeout(function () {  // Delay implemented to have a top-biased mix
        pumpMilliseconds(ingredients[i].pump, ingredients[i].amount);
      }, ingredients[i].delay);
    })(i);
  }
  console.log("Done Dispensing Drink");
};

function pumpMilliseconds(pump, ms) {
  console.log("\033[32m[PUMP] " + pump + "for " + ms + "\033[91m");
  exports.startPump(pump);
  setTimeout(function () {
    exports.stopPump(pump);
  }, ms);
}

exports.startPump = function (pump) {
  console.log("\033[32m[PUMP] Starting " + pump + "\033[91m");
  var p = exports.usePump(pump);
  p.on();
	onPumps++;
	if (onPumps > 0)
		pumpSwitch.off();
}

exports.stopPump = function (pump) {
  console.log("\033[32m[PUMP] Stopping " + pump + "\033[91m");
  var p = exports.usePump(pump);
  p.off();
	onPumps--;
	if (onPumps <= 0)
		pumpSwitch.on();
}

exports.usePump = function (pump) {
  var using;
  switch(pump) {
    case 'pump0':
      using = pump0;
      break;
    case 'pump1':
      using = pump1;
      break;
    case 'pump2':
      using = pump2;
      break;
    case 'pump3':
      using = pump3;
      break;
    case 'pump4':
      using = pump4;
      break;
    case 'pump5':
      using = pump5;
      break;
    case 'pump6':
      using = pump6;
      break;
    case 'pump7':
      using = pump7;
      break;
    case 'pump8':
      using = pump8;
      break;
    default:
      using = null;
      break;
  }
  return using;
}
