require('./config/config');
const express = require('express');
const createError = require('http-errors');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')
const flash = require('connect-flash');
const session = require('express-session')

const { mongoose } = require('./db/mongoose');
const { segmentsUpdateJob } = require('./services/QueuingServices/segmentsUpdateJob')

const product_views = require('./routes/product_views');
const ad_views = require('./routes/ad_views')
const customer_views = require('./routes/customer_views')
const gift_views = require('./routes/gift_views')
const loyatly_views = require('./routes/loyalty_views')
const dashboard = require('./routes/dashboard');
const search_pages = require('./routes/search-pages');
const authentication = require('./routes/authentication');
const merchant = require('./routes/merchant');
const merchant_views = require('./routes/merchant_views');
const customer = require('./routes/customer');
const gift = require('./routes/gift')
const loyaltyProgram = require('./routes/loyaltyProgram')
const product = require('./routes/product');

const ad = require('./routes/ad')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Main Layout not use
app.use('/authentication', authentication);

app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser('pointySecret'))
app.use(session({
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: false,
  secret: 'pointySecret'
}));
app.use(flash());

const port = process.env.PORT;
const env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

global.url = 'http://localhost:3001/';
const biasApiRoute = "/api/v1/";

const generateApiRoute = (route) => `${biasApiRoute}${route}`;

app.use('/', dashboard);
app.use('/dashboard', dashboard);
app.use('/search-pages', search_pages);
app.use('/merchant', merchant_views)
app.use('/gift', gift_views);
app.use('/ad', ad_views);
app.use('/customer', customer_views);
app.use('/loyaltyProgram', loyatly_views)
app.use('/product', product_views)
app.use(generateApiRoute('merchant'), merchant);
app.use(generateApiRoute('loyaltyProgram'), loyaltyProgram);
app.use(generateApiRoute('customer'), customer);
app.use(generateApiRoute('gift'), gift);
app.use(generateApiRoute('ad'), ad);
app.use(generateApiRoute('product'), product);

app.listen(port, () => {
  console.log(`Server is up on port ${port} in a (${env}) environment`);
});