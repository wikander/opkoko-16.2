let rotation = 0;
let ΔRotation = 20;
let speed = 800;
let lastUpdate = 0;
const rotationUnit = "deg";
let color = "#000000";

console.log("%cOPKoKo 16.2!", "font-size: 45px; background: red; color: white; text-align: center; width: 100%;");

function step(timestamp) {

  if (timestamp - lastUpdate >= speed) {
    let elementsToAnimate = document.querySelectorAll('.animate');
    for (let elm of elementsToAnimate) {
      elm.style.transform = "rotate(" + rotation + rotationUnit + ")";
      elm.style.color = color;
    }

    update(timestamp);
  } else {
    console.log("Skipped");
  }

  window.requestAnimationFrame(step);
}

function update(updateTime) {
  lastUpdate = updateTime;
  rotation = rotation + ΔRotation;
  color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
}

window.requestAnimationFrame(step);
