const $chat = document.querySelector(".chat");
const $input = document.querySelector("#text-message");
const $send = document.querySelector("form");
const $numch = document.querySelectorAll("li");
let currentchannel = 0;
const dummy = [
  {
    author: {
      image: "http://lorempixel.com/40/40/animals/",
      name: "Jaime Muñoz",
    },
    time: "11:04",
    datacontent: "Hola a Todos",
  },
  {
    author: {
      image: "http://lorempixel.com/40/40/people/",
      name: "Elkin Lopez",
    },
    time: "11:05",
    datacontent: "Hola a Todos 2",
  },
  {
    author: {
      image: "http://lorempixel.com/40/40/cats/",
      name: "Josua Perez",
    },
    time: "11:06",
    datacontent: "Hola a Todos 3",
  },
];
const channels = [
  {
    messages: [],
    name: "#Channel 1",
  },
  {
    messages: [],
    name: "#Channel 2",
  },
  {
    messages: [],
    name: "#Channel 3",
  },
  {
    messages: [],
    name: "#Channel 4",
  },
];

var channel = channels.find(
  (channel) => channel.name === $numch[currentchannel].textContent
);

$numch.forEach((element, index) => {
  element.addEventListener("click", () => {
    const actual = document.getElementsByClassName("selection");
    actual[0].setAttribute("class", "");
    element.setAttribute("class", "selection");
    channel = channels.find((channel) => channel.name === element.textContent);
    currentchannel = index;
    $chat.innerHTML = "";
    printMessages();
  });
});

$send.addEventListener("submit", (sendMessage) => {
  sendMessage.preventDefault();
  const value = $input.value;
  if (value !== "") {
    const now = new Date();
    let minutes = now.getMinutes();
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    const message = {
      author: {
        image: "http://lorempixel.com/40/40/animals/",
        name: "Julio Bermudez",
      },
      time: `${now.getHours()}:${minutes}`,
      datacontent: value,
    };
    addMessage(message);
    channel.messages.push(message);
    $chat.scrollTop = $chat.scrollHeight;
    $input.value = "";
    //console.log(channels[currentchannel].messages);
  }
});

function addMessage(message) {
  const { author, time, datacontent } = message;
  const template = `<div class="container-message">
                <img src="${author.image}" alt="" />
                <span class="author">${author.name}</span>
                <span class="time">${time}</span>
                <p>${datacontent}</p>
                </div>`;
  $chat.innerHTML += template;
}

function printMessages() {
  const messages = channels[currentchannel].messages;
  messages.forEach((message) => {
    addMessage(message);
  });
}

function printMessagesajax() {
  var request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/comments", true);
  request.onload = function () {
    const dato = JSON.parse(this.responseText);
    dato.length = 30;
    dato.forEach((result) => {
      const now = new Date();
      let minutes = now.getMinutes();
      if (minutes <= 9) {
        minutes = "0" + minutes;
      }
      const message = {
        author: {
          image: "http://lorempixel.com/40/40/animals/",
          name: result.name,
        },
        time: `${now.getHours()}:${minutes}`,
        datacontent: result.body,
      };
      addMessage(message);
      channel.messages.push(message);
      $chat.scrollTop = $chat.scrollHeight;
    });
  };
  request.send();
}

printMessagesajax();
