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
      data.push(0)
    }
  }
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
    count += 1;
  }
}
if (count > 0) data2.push(count);

let data3 = [];
let arr = [];
for (let i = 0; i < data.length; i++) {
  const el = data2[i];
  if (typeof el === "number") {
    if (arr.length) data3.push(arr);
    data3.push(el);
    arr = [];
  } else {
    arr.push(el);
  }
}
if (arr.length) data3.push(arr);


let result = {
  tempo: song.tempo,
  data: data3
};

console.log(JSON.stringify(result));