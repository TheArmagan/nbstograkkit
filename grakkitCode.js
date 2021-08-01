const {command, type, server, file} = require("@grakkit/stdlib-paper");
const Note = type("org.bukkit.Note");
const Instrument = type("org.bukkit.Instrument");

function betterSleep(ms) {
  return new Promise((resolve) => {
    let endTime = Date.now() + ms;
    let interval = setInterval(() => {
      if (Date.now() > endTime) {
        resolve();
        clearInterval(interval);
      }
    }, 0);
  });
}

const codeToInstrument = {
  "0": "PIANO",
  "1": "BASS_GUITAR",
  "2": "BASS_DRUM",
  "3": "SNARE_DRUM",
  "4": "STICKS",
  "5": "GUITAR",
  "6": "FLUTE",
  "7": "BELL",
  "8": "CHIME",
  "9": "XYLOPHONE",
  "10": "IRON_XYLOPHONE",
  "11": "COW_BELL",
  "12": "DIDGERIDOO",
  "13": "BIT",
  "14": "BANJO",
  "15": "PLING"
};

const notes = {};

for (let i = 0; i < 25; i++) {
  notes[i] = new Note(i);
}

const songs = {
  hopesanddreams: require("../data/songs/hopesanddreams.music.json"),
  cancan: require("../data/songs/cancan.music.json"),
  undertale: require("../data/songs/undertale.music.json"),
  test: require("../data/songs/test.music.json")
};

const stopWanted = {};

command({
  name: "song",
  execute(sender, songCode) {
    let player = server.getPlayer(sender.getName());
    let playerName = player.getName();

    if (songCode == "STOP") {
      stopWanted[playerName] = true;
      player.sendMessage("§7Durdurma isteği gönderildi.");
      return;
    }

    let song = songs[songCode];

    if (!song) return player.sendMessage("Song bulunamadı.");
    player.sendMessage(`§7Song başladı. (${songCode})`)
    setTimeout(async () => {
      for (let i = 0; i < song.length; i++) {
        if (stopWanted[playerName]) {
          delete stopWanted[playerName];
          break;
        }
        const element = song[i];
        if (Array.isArray(element)) {
          element.forEach((note) => {
            setImmediate(() => {
              player.playNote(player.getLocation(), Instrument[codeToInstrument[note[0]]], notes[note[1]])
            })
          })
        } else {
          if (element > 0) await betterSleep(element)
        }
      }
      player.sendMessage(`§7Song bitti. (${songCode})`)
    }, 1);
  },
  tabComplete(sender, ...args) {
    return [...Object.keys(songs), "STOP"];
  }
})

