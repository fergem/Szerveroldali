var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());



require('./routes/companyMemberList')(app);
require('./routes/hardwareList')(app);
require('./routes/softwareList')(app);
require('./routes/outside')(app);


app.use((err, req, res, next) => {
    res.end('Problem...');
});

app.listen(3000, () => {console.log("Fut a szeró")});