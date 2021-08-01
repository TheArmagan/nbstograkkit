const {getClicks} = require("./getClicks");
const NBS = require("./NBS")
const path = require("path");

let song = NBS.loadSong(path.resolve(__dirname, process.argv[2]));

let layers = Object.values(song.layers);

let data = [];

for (let noteIndex = 0; noteIndex < song.length + 1; noteIndex++) {
  let notePack = [];
  let sleeps = 0;

  for (let lIndex = 0; lIndex < layers.length; lIndex++) {
    let layer = layers[lIndex];
    let note = layer.notes[noteIndex];

    if (note) {
      notePack.push([note.instrument, Number(getClicks(note.pitch))])
    } else {
      sleeps += 1;
    }
  }

  if (notePack.length > 0) {
    data.push(notePack);
  }
  if (sleeps > 0) data.push(Number(sleeps.toFixed(2)))

}

console.log(JSON.stringify(data));



