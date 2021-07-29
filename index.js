const { getClicks } = require("./getClicks");
const NBS = require("./NBS")
const path = require("path");

let song = NBS.loadSong(path.resolve(__dirname, process.argv[2]));

let layers = Object.values(song.layers);

let data = [];
for (let noteIndex = 0; noteIndex < song.length + 1; noteIndex++) {
  for (let lIndex = 0; lIndex < layers.length; lIndex++) {
    let layer = layers[lIndex];
    let note = layer.notes[noteIndex];

    if (note) {
      data.push([note.instrument, Number(getClicks(note.pitch))])
    } else {
      sleeps += 1;
    }
  }
  
  if (notePack.length > 0) data.push(notePack);
  if (sleeps > 0) data.push(Number(sleeps.toFixed(2)))

let data2 = [];
let count = 0;
for (let i = 0; i < data.length; i++) {
  const el = data[i];
  if (typeof el === "object") {
    if (count > 0) data2.push(count);
    data2.push(el);
    count = 0;
  } else {
    count += 1;
  }
}

let data2 = [];
let dur = 0;
for (let i = 0; i < data.length; i++) {
  const el = data[i];
  if (typeof el === "object") {
    if (dur > 0) data2.push(dur);
    data2.push(el);
    dur = 0;
  } else {
    dur += el;
  }
}
if (dur > 0) data2.push(dur);

console.log(JSON.stringify(data2))

console.log(JSON.stringify(result));