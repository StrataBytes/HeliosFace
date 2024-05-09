document.addEventListener('DOMContentLoaded', function () {
    //blink starts
    function blink() {
        gsap.to(".eye", { scaleY: 0, duration: 0.1, yoyo: true, repeat: 1, onComplete: startBlinking });
    }

    function startBlinking() {
        setTimeout(blink, getRandomDelay(3000, 10000)); //blink time (random)
    }

    function getRandomDelay(min, max) {
        return Math.random() * (max - min) + min;
    }

    //initiate first blink
    blink();

    //default to happy face
    changeEmotion('happy');

    //random action triggering
    setInterval(randomAction, 10000); 
});



function randomAction() {
    const actions = [
        () => lookLeftAnimation(),
        () => lookRightAnimation(),
        () => nodAnimation(),
        () => surprisedAnimation(),
        () => changeEmotion('veryHappy'),
        
    ];

    //random select and execute an action
    const randomIndex = Math.floor(Math.random() * actions.length);
    actions[randomIndex]();

    //return to happy face after a delay
    setTimeout(() => changeEmotion('happy'), 5000); 
}



function changeEmotion(emotion) {
    var mouth = document.getElementById('mouth');

    //reset classes and styles
    mouth.className = '';
    mouth.style = ''; 

    if (emotion === 'happy') {
        mouth.classList.add('mouth');
    } else if (emotion === 'neutral') {
        mouth.classList.add('neutral');
    } else if (emotion === 'sad') {
        mouth.classList.add('mouth', 'sad');
    } else if (emotion === 'veryHappy') {
        mouth.classList.add('veryHappy');
    } else if (emotion === 'surprised') {
        mouth.classList.add('surprised');
    } else if (emotion === 'thinking') {
        mouth.classList.add('thinking');
    }
}






//background color
function toggleBackgroundColor() {
    var body = document.body;
    var currentColor = window.getComputedStyle(body).backgroundColor;

    //check current, and switch.
    if (currentColor === 'rgb(255, 255, 255)') { 
        body.style.backgroundColor = '#424242'; 
    } else {
        body.style.backgroundColor = '#FFFFFF'; 
    }
}

//event listener
document.getElementById('toggle-bg-btn').addEventListener('click', toggleBackgroundColor);





function nodAnimation() {
    const duration = 0.3;
    const mouthContainer = document.getElementById('mouth-container');

    gsap.to(mouthContainer, { y: 20, duration: duration });
    gsap.to(".eye", { y: 20, duration: duration, delay: 0.1 });

    gsap.to(mouthContainer, { y: 0, duration: duration, delay: duration });
    gsap.to(".eye", { y: 0, duration: duration, delay: duration + 0.1 });
}

function nod2xAnimation() {
    const duration = 0.3;
    const mouthContainer = document.getElementById('mouth-container');
    const timeline = gsap.timeline();

    timeline.to(mouthContainer, { y: 20, duration: duration })
            .to(".eye", { y: 20, duration: duration, delay: -duration }, 0) // Offset to start with mouth
            .to(mouthContainer, { y: 0, duration: duration })
            .to(".eye", { y: 0, duration: duration, delay: -duration }, duration);

    timeline.to(mouthContainer, { y: 20, duration: duration })
            .to(".eye", { y: 20, duration: duration, delay: -duration }, duration * 2)
            .to(mouthContainer, { y: 0, duration: duration })
            .to(".eye", { y: 0, duration: duration, delay: -duration }, duration * 3);
}


function lookLeftAnimation() {
    const duration = 0.3;

    gsap.to(["#mouth-container", ".eye"], { x: -20, duration: duration });

    setTimeout(() => {
        gsap.to(["#mouth-container", ".eye"], { x: 0, duration: duration });
    }, 2000); 
}

function lookRightAnimation() {
    const duration = 0.3;

    gsap.to(["#mouth-container", ".eye"], { x: 20, duration: duration });

    setTimeout(() => {
        gsap.to(["#mouth-container", ".eye"], { x: 0, duration: duration });
    }, 2000); 
}




function surprisedAnimation() {
    const duration = 0.5;
    changeEmotion('surprised');

    const mouthContainer = document.getElementById('mouth-container');
    gsap.to(mouthContainer, { x: 10, duration: duration }); 

    gsap.to(".eye", { scaleY: 1.5, duration: duration });

    setTimeout(() => {
        gsap.to(".eye", { scaleY: 1, duration: duration });
        gsap.to(mouthContainer, { x: 0, duration: duration }); 
    }, 3000); 
}



function thinkingAnimation() {
    const duration = 0.5;
    changeEmotion('thinking');
    gsap.to(["#mouth-container", ".eye"], { x: 10, duration: duration });
    setTimeout(() => {
        gsap.to(["#mouth-container", ".eye"], { x: 0, duration: duration });
    }, 4000); 
}
