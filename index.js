const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');

const PORT = 3333;
const PROXY_PORT = 8888
const app = express();
const NOTES_URL = '/notes';

const isProduction = !!process.env.WEBPACK_PRODUCTION;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// const frontend

//serwowanie statycznych plików
// app.get('*', express.static('./dist'));



// app.get('*', function(req, res) {
//     res.json({
//         hello: 'world'
//     })
// })

const notes = ['one note', 'two notes', 'three notes']

app.get(NOTES_URL, (req,res) => {
    res.json({
        notes: notes
    })
});

app.post(NOTES_URL, (req,res) => {
    const note = req.body.note;
    notes.push(note);
    res.json({
        value: note
    })
});

app.delete(NOTES_URL, (req,res) => {
    res.json({
        status: 'deleted'
    })
});

app.get('*', isProduction
    ? express.static('/dist')
    : proxy('http://localhost:8888')
);


app.listen(PORT, function() {
    // console.log(`listening on port http://localhost:${PORT}`);
    console.log(`listening on port \u001b[36;1m http://localhost:${PORT} \x1b[0m`);

});