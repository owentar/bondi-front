var express = require('express');
var expressLayouts = require('cloud/lib/express-layouts');
var routes = require('cloud/routes/bondi');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.use(express.bodyParser());

app.get('/', routes.index);

app.listen();
