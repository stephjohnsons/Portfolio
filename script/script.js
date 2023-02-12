let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come back :(";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});

// Greeting user based on time of day. 
function greetUser() {
    const date = new Date();
    const hour = date.getHours(); 
    
    let greetMessage;

    let editable = "<span contenteditable> you</span>";

    if (hour < 12 ) {
        greetMessage = `good morning, ${editable}.`
    } else if (hour < 18) {
        greetMessage = `good afternoon, ${editable}.`
    } else {
        greetMessage = `good evening, ${editable}.`
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

