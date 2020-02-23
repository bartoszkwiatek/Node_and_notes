const express = require('express');
const proxy = require('express-http-proxy');

const PORT = 3210;

const app = express();

const isProduction = !!process.env.WEBPACK_PRODUCTION;

// const frontend

//serwowanie statycznych plików
// app.get('*', express.static('./dist'));

app.get('*', isProduction
    ? express.static('./dist')
    : proxy('http://localhost:8081')
);


// app.get('*', function(req, res) {
//     res.json({
//         hello: 'world'
//     })
// })

app.listen(PORT, function() {
    // console.log(`listening on port http://localhost:${PORT}`);
    console.log(`listening on port \u001b[36;1m http://localhost:${PORT} \x1b[0m`);
    


});