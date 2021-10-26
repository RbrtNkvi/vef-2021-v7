/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  if(isNaN(bestOf)) {
    return false;
  }
  let games = parseInt(bestOf);
  if(games <= 0 || games > MAX_BEST_OF) {
    return false;
  }
  if(games % 2 === 0) {
    return false;
  } else {
    return true;
  }
}
// console.assert(isValidBestOf(1) === true, '1 er valid best of');
// console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
// console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  if(play === '1') {
    return 'Skæri';
  } else if(play === '2') {
    return 'Blað';
  } else if(play === '3') {
    return 'Steinn';
  } else {
    return 'Óþekkt';
  }
}
// console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
// console.assert(playAsText('2') === 'Blað', '2 táknar blað');
// console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
// console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  if(player === '1') {
    if(computer === '1') {
      return 0;
    } else if(computer === '2') {
      return 1;
    } else {
      return -1;
    }
  } else if(player === '2') {
    if(computer === '1') {
      return -1;
    } else if(computer === '2') {
      return 0;
    } else {
      return 1;
    }
  } else {
    if(computer === '1') {
      return 1;
    } else if(computer === '2') {
      return -1;
    } else {
      return 0;
    }
  }
}
// console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
// console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
// console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
// console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
// console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  let player = window.prompt("Hvað setur þú út? Skæri (1), Blað (2) eða Steinn (3)?");
  // 2. Ef ógilt, tölva vinnur
  if(parseInt(player) < 1 || parseInt(player) > 3 || isNaN(player)) {
    window.alert(`${player} er ógilt svar. Tölvan vinnur!`);
    return -1;
  } else if(!player) {
    return 10;
  }
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  let randomNum = Math.floor(Math.random() * 3) + 1;
  let computer = randomNum.toString();
  // 4. Nota `checkGame()` til að finna hver vann
  let winner = checkGame(player, computer);
  // 5. Birta hver vann
  if(winner === -1) {
    window.alert(`Þú spilaðir: ${playAsText(player)}.\nTölva spilaði: ${playAsText(computer)}.\nÞú tapaðir.`);
  } else if(winner === 0) {
    window.alert(`Þú spilaðir: ${playAsText(player)}.\nTölva spilaði: ${playAsText(computer)}.\nJafntefli.`);
  } else {
    window.alert(`Þú spilaðir: ${playAsText(player)}.\nTölva spilaði: ${playAsText(computer)}.\nÞú sigraðir.`);
  }
  // 6. Skila hver vann
  return winner;
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
function play() {
  // 1. Spyrja um fjölda leikja
  let bestOf = window.prompt("Besta af hve mörgum leikjum? Verður að vera jákvæð oddatala minni en 10.");
  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  if(isValidBestOf(bestOf) === false) {
    console.error(`${bestOf} er ekki löglegt gildi!`);
    return;
  }
  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  let pWin = 0;
  let cWin = 0;
  let cancel = 0;
  while(pWin < Math.ceil(bestOf/2) && cWin < Math.ceil(bestOf/2)) {
    let game = round();
    if(game === 10) {
      cancel = 1;
      break;
    }
    if(game === 1) {
      pWin++;
    } else if(game === -1) {
      cWin++;
    }
  }
  // 4. Birta hvort spilari eða tölva vann
  if(cancel === 0) {
    if(pWin > cWin) {
      window.alert("Þú vinnur");
      wins++;
    } else if(pWin < cWin) {
      window.alert("Þú tapar");
      losses++;
    }
  }
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  // TODO útfæra
  console.log(`Þú hefur spilað ${wins+losses} leiki.`);
  if(wins + losses != 0) {
    console.log(`Þú hefur unnið ${wins}, eða ${(wins/(wins+losses) * 100).toFixed(2)}% af heild.`);
    console.log(`Þú hefur tapað ${losses}, eða ${(losses/(wins+losses) * 100).toFixed(2)}% af heild.`);
  }
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
