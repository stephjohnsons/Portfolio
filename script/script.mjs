/**
 * letterize.js v2.0.1
 * (c) 2022 Wojciech Krakowiak
 * Released under the MIT license
 * https://github.com/WojciechWKROPCE/letterize
 */

/*jshint esversion: 6 */
const getTargets = (targets) => {
    if (targets instanceof NodeList ||
        targets instanceof HTMLCollection ||
        Array.isArray(targets)) {
        return targets;
    }
    else if (targets instanceof HTMLElement) {
        return [targets];
    }
    else if (typeof targets === "string") {
        return document.querySelectorAll(targets);
    }
    return null;
};
const deconstructText = (node, wrapper, className) => {
    const text = node.textContent.trim();
    const textLength = text.length;
    const list = [];
    node.textContent = "";
    for (let n = 0; n < textLength; n++) {
        const letterNode = document.createElement(wrapper);
        if (className && className.length)
            letterNode.classList.add(className);
        // Replace spaces with &nbsp; so it has width after letterizing
        letterNode.textContent = text[n] === " " ? "\xa0" : text[n];
        node.before(letterNode);
        list.push(letterNode);
    }
    return list;
};
const deconstructObjects = (targets, target, wrapper, className, list, listAll, i, id) => {
    if (!Array.isArray(target.letterize_id)) {
        target.letterize_id = [];
    }
    if (!target.letterize_id.includes(id)) {
        target.letterize_id.push(id);
        const nodeList = [...target.childNodes];
        const nodeListLength = nodeList.length;
        for (let j = 0; j < nodeListLength; j++) {
            let listPart;
            switch (nodeList[j].nodeType) {
                case 1:
                    if (Array.prototype.indexOf.call(targets, nodeList[j]) === -1) {
                        // Check if current nodeList[j] wasn't deconstructed (it can happen if a target node is in another target node).
                        deconstructObjects(targets, nodeList[j], wrapper, className, list, listAll, i, id);
                    }
                    break;
                case 3:
                    listPart = deconstructText(nodeList[j], wrapper, className);
                    listAll.push(...listPart);
                    list[i].push(...listPart);
                    break;
            }
        }
    }
};
class Letterize {
    constructor(params) {
        const targets = getTargets(params.targets);
        if (!targets || !targets.length) {
            console.error(`Letterize: targets '${targets}' not found or not specified`);
            return;
        }
        const targetsLength = targets.length;
        Letterize.numInstances = (Letterize.numInstances || 0) + 1;
        const wrapper = params.wrapper || "span";
        const className = params.className;
        const id = Letterize.numInstances;
        const list = [];
        const listAll = [];
        for (let i = 0; i < targetsLength; i++) {
            list[i] = [];
            deconstructObjects(targets, targets[i], wrapper, className, list, listAll, i, id);
        }
        this._wrapper = wrapper;
        this._targets = targets;
        this._list = list;
        this._listAll = listAll;
        this._className = className;
    }
    get listAll() {
        return this._listAll;
    }
    get list() {
        return this._list;
    }
    get targets() {
        return this._targets;
    }
    get className() {
        return this._className;
    }
    get wrapper() {
        return this._wrapper;
    }
    deletterize() {
        const listLength = this.listAll.length;
        for (let i = 0; i < listLength; i++) {
            this.listAll[i].before(...Array.from(this.listAll[i].childNodes));
            this.listAll[i].remove();
        }
        this._wrapper = undefined;
        this._targets = undefined;
        this._list = undefined;
        this._listAll = undefined;
        this._className = undefined;
        this.deletterize = undefined;
    }
}

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
import { Letterize } from "letterize.min.js";
import { anime } from "anime.min.js";
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