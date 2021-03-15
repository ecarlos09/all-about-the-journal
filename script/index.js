

let i = 0;
let text = 'Consoul.log'; 
let speed = 300; 

function typeWriter() {
  if (i < text.length) {
    document.querySelector("h1").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
window.onload = typeWriter()

