let rotation = 0;
let ΔRotation = 20;
let speed = 800;
let lastUpdate = 0;
let color = "#000000";
let count = 0;

const rotationUnit = "deg";
const fibonacciGenerator = fibonacci();

localStorage.setItem('savedToLocalStorage', 'Yeah!');
const db = openDatabase('koko', '1.0', 'OPKoKo 16.2 databasen', 2 * 1024 * 1024);

console.log("%cOPKoKo 16.2!", "font-size: 45px; background: red; color: white; text-align: center; width: 100%; padding: 8px; margin: 8px;");
fetchStuff();


db.transaction(function (tx) {
 tx.executeSql('CREATE TABLE IF NOT EXISTS FIB (fib)');
 tx.executeSql(`DELETE FROM FIB`);
});
for (let i = 0; i < 80; i++) {
  addFib(fibonacciGenerator.next().value);
}

function step(timestamp) {
  if (timestamp - lastUpdate >= speed) {
    let elementsToAnimate = document.querySelectorAll('.animate-js');
    for (let elm of elementsToAnimate) {
      elm.style.transform = "rotate(" + rotation + rotationUnit + ")";
      elm.style.color = color;
    }
    update(timestamp);
  }
  window.requestAnimationFrame(step);
}

function update(updateTime) {
  count += 1;
  lastUpdate = updateTime;
  rotation = rotation + ΔRotation;
  color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  const res = factorial(getRandomInt(1, 150));
}

window.requestAnimationFrame(step);

function factorial(n) {
  if (n <= 1) {
    return n;
  } else if (n === 30) {
    pause(100);
    return n * factorial(n-1);
  } else {
    return n * factorial(n-1);
  }
}

function* fibonacci(){
  var fn1 = 0;
  var fn2 = 1;
  while (true){
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    if (reset){
        fn1 = 0;
        fn2 = 1;
    }
  }
}

function pause(ms) {
     let curr = new Date().getTime();
     ms += curr;
     while (curr < ms) {
         curr = new Date().getTime();
     }
 }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function fetchStuff() {
  const init = {
              method: 'GET',
              mode: 'no-cors'
             };

  fetch('http://www.wikander.net', init)
    .then(function(response) {
      return true;
    })
}

function addFib(fib) {
  db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS FIB (fib)');
   tx.executeSql(`INSERT INTO FIB (fib) VALUES (${fib})`);
  });
}
