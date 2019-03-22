"use strict"

// var player;
//
// var tag = document.createElement('script');
// tag.id = 'iframe-demo';
// tag.src = 'https://www.youtube.com/iframe_api';
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     playerVars: { 'autoplay': 1, 'controls': 0 },
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }
// function onPlayerReady(event) {
//   document.getElementById('player').style.borderColor = '#FF6D00';
// }
//
//
//   var sound = document.getElementById("btn-sound");
//
//   sound.addEventListener('click', turnOnSound);
//
//   function turnOnSound() {
//
//   }

var video = document.getElementById("video");
var sound = document.getElementById("btn-sound");
var open = document.getElementById('btn-open');

sound.addEventListener('click', switchSound);
open.addEventListener('click', openFrame);

function switchSound() {
  if(video.muted){
    video.muted = false;
  } else {
    video.muted = true;
  }
}

function openFrame(){
  var boxIframe = document.createElement('div');
  var iframe = document.createElement('iframe');
  var iframeBtn = document.createElement('div');

  boxIframe.classList.add('box-iframe');

  iframeBtn.innerHTML = "X";
  iframeBtn.classList.add('btn-close');

  iframe.src = "https://www.youtube.com/embed/HUX_kuFJzNA";

  boxIframe.appendChild(iframe);
  boxIframe.appendChild(iframeBtn);

  iframeBtn.addEventListener('click', closeFrame);

  var mainEl = document.querySelector('.main');
  mainEl.insertBefore(boxIframe, mainEl.firstElementChild);

  function closeFrame() {
    mainEl.removeChild(boxIframe);
  }
}



