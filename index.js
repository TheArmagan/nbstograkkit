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
  if (sleeps > 0) data.push(Number((Number(sleeps.toFixed(2)) / layers.length).toFixed(2)) * 100);

}

let data2 = [];
let count = 0;
for (let i = 0; i < data.length; i++) {
  const el = data[i];
  if (typeof el === "object") {
    if (count > 0) data2.push(count);
    data2.push(el);
    count = 0;
  } else {
    count += el;
  }
}
if (count > 0) data2.push(count);

console.log(JSON.stringify(data2));



