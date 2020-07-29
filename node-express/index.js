var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishRouter = require('./routes/dishRouter');
app.use('/dishes', dishRouter.router);

var promoRouter = require('./routes/promoRouter');
app.use('/promotions', promoRouter.router);

var leaderRouter = require('./routes/leaderRouter');
app.use('/leadership', leaderRouter.router);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});