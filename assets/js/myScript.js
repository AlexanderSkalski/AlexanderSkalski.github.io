// // alert("Hewwo!")

let thingy;
let container;
let slider;
const imageScale = 1;

let velX = 5.0, velY = 2.0;
let velMax = 10.0;

async function load(){
    let i = 0;
    while(i < 100 && 
        (document.getElementById("myLittleThingy")===null ||
         document.getElementById("myLittleContainer")===null || 
         document.getElementById("myRange") ===null)){
        await new Promise(r => setTimeout(r, 500));
        i++;
        console.log("Loading...")
    }
    thingy = document.getElementById("myLittleThingy");
    container = document.getElementById("myLittleContainer");
    slider = document.getElementById("myRange");
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        velMax = parseInt(this.value,10);
        console.log("Updated speed limit: ", velMax);
    } 

    init();
}
function init() {
    console.log("Init")
    thingy.style.backgroundSize= "150px";
    thingy.style.width= "150px";
    thingy.style.height= "100px";
    thingy.style.position = 'absolute';
    thingy.style.top = `${0}px`;
    let x = 100;
    thingy.style.left = `${0}px`;

    // animate the logo
    requestAnimationFrame(step);
}
function inside(x,y){
    if(x<0 || x + parseInt(thingy.style.width,10) * imageScale>container.offsetWidth){
        // console.log("OUTSIDE X", x + parseInt(thingy.style.width,10)* imageScale, container.offsetWidth)
        velX *= -1;
    }
    if(y<0 || y+ parseInt(thingy.style.height,10) * imageScale>container.offsetHeight){
        // console.log("OUTSIDE Y", y+ parseInt(thingy.style.height,10) * imageScale,container.offsetHeight)
        velY *= -1;
    }
}
// let x = 0;
// let y = 0;
function step(){
    const scale = 3;
    let delta = 1;
    console.log(velX,velY)
    inside(thingy.offsetLeft + velX * delta, thingy.offsetTop + velY * delta)

    thingy.style.left = `${thingy.offsetLeft + velX * delta}px`;
    thingy.style.top = `${thingy.offsetTop + velY * delta}px`;

    let xAcc = Math.round((Math.random() - 0.5) * scale);
    let yAcc = Math.round((Math.random() - 0.5) * scale);
    
    velX += xAcc*delta;
    velY += yAcc*delta;

    if(velX === 0) velX += xAcc*scale;
    if(velY === 0) velY += yAcc*scale;

    if(Math.abs(velX) > velMax) velX = velMax;
    if(Math.abs(velY) > velMax) velY = velMax; 

    if(velX < 0){
        thingy.style.transform= "scaleX(1)";
    }else{
        thingy.style.transform= "scaleX(-1)";
    }

    requestAnimationFrame(step);
}

// document.addEventListener('keydown', (event) => {
//     if (event.defaultPrevented) {
//       return; // Do nothing if event already handled
//     }

//     switch (event.code) {
//       case "KeyS":
//       case "ArrowDown":
//         // Handle "back"
//         y = 1;
//         break;
//       case "KeyW":
//       case "ArrowUp":
//         // Handle "forward"
//         y = -1;
//         break;
//       case "KeyA":
//       case "ArrowLeft":
//         // Handle "turn left"
//         x = -1;
//         break;
//       case "KeyD":
//       case "ArrowRight":
//         // Handle "turn right"
//         x = 1;
//         break;
//     }

//     requestAnimationFrame(step);
// });



load();

