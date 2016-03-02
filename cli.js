#!/usr/bin/env node
var Player = require('player');
var spawn = require('child_process').spawn;

var media_files = [
  { song: '/media/gee_smooth_jazz.mp3',
    credits: 'Gee - Smooth Jazz'
  },
  { song: '/media/jazz_in_paris.mp3',
    credits: 'Jazz in Paris - Media Right Productions'
  },
  { song: '/media/smooth_jazz_funky_muic_afternoon_lounge.mp3',
    credits: 'Smooth Jazz - Funky Music \'Afternoon Lounge\''
  }
];

var song = getRandomSong(media_files);
var player = new Player(__dirname + song.song);


function getRandomSong (media_files) {
  return media_files[Math.floor(Math.random() * media_files.length)];
}

var args = process.argv.slice(2);
var ps = npm(args);

if (isInstall(args)) {
  playSoftJazz();
  ps.on('exit', function (code) {
    if (player) {
      player.stop();
    }
    process.exit(code);
  });
}

function playSoftJazz () {
  process.stdout.write(song.credits + '\n');
  player.play();
}

function isInstall (args) {
  return args[0] === 'i' || args[0] === 'install';
}

function npm (args) {
  return spawn('npm', args, {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
}
