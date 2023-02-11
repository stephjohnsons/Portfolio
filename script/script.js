// Greeting user based on time of day. 
function greetUser() {
    const date = new Date();
    const hour = date.getHours(); 
    const timestamp = new Date().getTime();
    const dateNow = new Date(timestamp);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false};
    const humanReadableTime = date.toLocaleTimeString("en-US", options);
    
    let greetMessage;

    let editable = "<span contenteditable> you</span>";

    if (hour < 12 ) {
        greetMessage = `good morning, ${editable}. It is now ${humanReadableTime}.`
    } else if (hour < 18) {
        greetMessage = `good afternoon, ${editable}. It is now ${humanReadableTime}.`
    } else {
        greetMessage = `good evening, ${editable}. It is now ${humanReadableTime}.`
    };

    document.getElementById("greeting").innerHTML = greetMessage;
}

function jobTitle() {
    const job1 = "web developer.";
    const job2 = "UI designer.";
    const job3 = "digital content creator.";
    const job4 = "musician.";

    let currentJob = job1; 

    const span = document.querySelector(".job");
    span.textContent = currentJob;

    span.addEventListener('click', function() {
    if (currentJob === job1) {
        currentJob = job2;
    } else if (currentJob === job2) {
        currentJob = job3;
    } else if (currentJob === job3) {
        currentJob = job4;
    } else {
        currentJob = job1;
    }
    span.textContent = currentJob;
    });
};

window.onload = greetUser();
window.onload = jobTitle();

// Animation of capitalized name using LetterizeJS.
import "letterize.mjs";
import "anime.mjs";
const animateName = new Letterize({
    targets: ".animation-name"
  });

  const animation = anime.timeline({
    targets: animateName.listAll,
    delay: anime.stagger(100, {
      grid: [animateName.list[0].length, animateName.list.length],
      from: "center"
    }),
    loop: true
  });

  animation
    .add({
      scale: 0.5
    })
    .add({
      letterSpacing: "10px"
    })
    .add({
      scale: 1
    })
    .add({
      letterSpacing: "6px"
    });