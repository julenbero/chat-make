const $chat = document.querySelector('.chat');
const $input = document.querySelector('#text-message');
const $send = document.querySelector('form');
const dummy = [{
    	author: {
    		image: 'http://lorempixel.com/40/40/animals/',
    		name: 'Jaime Muñoz'
    	},
    	time: '11:04',
    	datacontent: 'Hola a Todos'
    },
    {
    	author: {
    		image: 'http://lorempixel.com/40/40/people/',
    		name: 'Elkin Lopez'
    	},
    	time: '11:05',
    	datacontent: 'Hola a Todos 2'
    },
    {
    	author: {
    		image: 'http://lorempixel.com/40/40/cats/',
    		name: 'Josua Perez'
    	},
    	time: '11:06',
    	datacontent: 'Hola a Todos 3'
    }];
const channels = [
    {
        messages: [],
        name: 'channel1'
    },
    {
        messages: [],
        name: 'channel2'
    },
    {
        messages: [],
        name: 'channel3'
    },
    {
        messages: [],
        name: 'channel4'
    }

];

const channel = channels.find((channel) => channel.name === 'channel1');

$send.addEventListener('submit', (sendMessage) => {
    sendMessage.preventDefault();
    const value = $input.value;
    if(value !== ''){
        const now = new Date();
        let minutes = now.getMinutes();
        if (minutes <= 9){
            minutes = "0" + minutes;
        }

        const message = {
            author: {
                image: 'http://lorempixel.com/40/40/animals/',
                name: 'Julio Bermudez'
            },
            time: `${now.getHours()}:${minutes}`,
            datacontent: value
        };
    addMessage(message);
    channel.messages.push(message);
    $chat.scrollTop = $chat.scrollHeight;
    $input.value = "";
    }
});   

function addMessage(message) { //Se puede reemplazar message {author, time, datacontent}
    const {author, time, datacontent} = message; //destructing
	const template = `<div class="container-message">
                <img src="${author.image}" alt="" />
                <span class="author">${author.name}</span>
                <span class="time">${time}</span>
                <p>${datacontent}</p>
                </div>`;
    //console.log(template);
    $chat.innerHTML += template;
}

// for (i = 0; i < messages.length; i++) {
//     addmessage(messages[i]);
// }

// Se puede usar map para reemplazar forEach
channel.messages.forEach((message) => {
    addMessage(message);
});