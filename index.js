const { getClicks } = require("./getClicks");
const NBS = require("./NBS")
const path = require("path");

let song = NBS.loadSong(path.resolve(__dirname, "input/gravityfalls.nbs"));

let layers = Object.values(song.layers);

let result = [];
let sleepDur = song.tempo;

for (let noteIndex = 0; noteIndex < song.length + 1; noteIndex++) {
  let notePack = [];
  let sleeps = 0;

  for (let lIndex = 0; lIndex < layers.length; lIndex++) {
    let layer = layers[lIndex];
    let note = layer.notes[noteIndex];

    if (note) {
      notePack.push([note.instrument, Number(getClicks(note.pitch))])
    } else {
      sleeps += sleepDur;
    }
  }
  if (notePack.length > 0) result.push([1, notePack]);
  if (sleeps > 0) result.push([0, sleeps])

}
console.log(JSON.stringify(result))

