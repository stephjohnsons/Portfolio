function greetUser() {
    const date = new Date();
    const hour = date.getHours(); 
    let greetMessage;

    if (hour < 12 ) {
        greetMessage = "good morning, you."
    } else if (hour < 18) {
        greetMessage = "good afternoon, you."
    } else if (hour < 23) {
        greetMessage = "good evening, you."
    } else {
        greetMessage = "it's late. good evening, you."
    };

    document.getElementById("greeting").innerHTML = greetMessage;
}

window.addEventListener("scroll", function moveWithScroll() {
    message.style.top = window.pageYOffset + "px",
    message.style.left = window.pageXOffset + "px"
});

window.onload = greetUser();