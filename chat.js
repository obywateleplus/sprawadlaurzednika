function generateTimestamp() {
    const cdate = new Date();
    const day = cdate.getUTCDay();
    const month = (cdate.getUTCMonth() + 1);
    const year = cdate.getUTCFullYear();
    const hours = cdate.getUTCHours();
    const minutes = cdate.getUTCMinutes();
    const seconds = cdate.getUTCSeconds();
    return (day+'/'+month+'/'+year+'T'+hours+':'+minutes+':'+seconds);
}

function sendChatMessage(msg, ticket) {
    const date = generateTimestamp();
    axios.post('http://87.206.112.180:43638/api/v1/chat',
    {
        content: msg,
        sent: date,
        ticket: ticket
    })
    .then(function (response) {});
}