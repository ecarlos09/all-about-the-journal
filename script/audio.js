const soundBtn = document.querySelector('#post-btn');
let myAudio = document.querySelector('#audio');
soundBtn.addEventListener('click', ()=>{
    myAudio.play();
});

