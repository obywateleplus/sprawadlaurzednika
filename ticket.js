async function addTicket(title, helper, ticketid, tickets) {
    var item = document.createElement('li');
    var ticket = document.createElement('div');
    ticket.classList.add("ticket");
    ticket.innerHTML = `${title}<br>Pomocy udziela: ${helper}<br><button id="chatbtn" data-ticketid="${ticketid}" class="btn">Rozmowa z urzędnikiem</button>`;
    item.innerHTML = ticket.outerHTML;
    tickets.insertBefore(item, tickets.firstChild);z
    window.scrollTo(0, document.body.scrollHeight);
}

async function addTickets(userid, type, ticketlist) {
    axios.get(`http://localhost:2056/api/v1/ticket?user=${userid}&type=${type}`)
    .then(function (response) {
        const json = JSON.parse(JSON.stringify(response.data));
        var i = 0;
        console.log(json);
        while (i < json.length) {
            console.log("Proccessing ticket: " + i);
            addTicket(json[i].title, localStorage.getItem('loged'), json[i].id, ticketlist);
            i += 1;
        }
    });
}