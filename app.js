const Koa = require('koa');
const router = require('./router');
const hbs = require('koa-hbs');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const passport = require('./auth');
const mongoose = require('mongoose');
const configs = require('./configs');


const app = module.exports = new Koa();
app.on('error', function(err){
    console.error(err.stack);
    console.log(err.message);
});

require('koa-validate')(app);
//app.proxy = true;
app.keys = ['your-session-secret', 'csrf-secret'];

app.use(async (ctx, next) => {
  console.log('%s - %s %s', new Date().toISOString(), ctx.req.method, ctx.req.url);
  await next();
});

app.use(bodyParser());
app.use(session(app));

app.use(new CSRF());

app.use(passport.initialize());
app.use(passport.session());

// clear flash after if it was actually set (so on the next request)
app.use(async (ctx, next) => {
  ctx.session.flash = this || undefined;
  await next();
});

app.use(hbs.middleware({
  viewPath: __dirname + '/views',
  partialsPath: __dirname + '/views/partials',
  defaultLayout: 'main',
  disableCache: true
}));

app.use(router.publicRouter.middleware());
app.use(router.securedRouter.middleware());

mongoose.connect(configs.dbUrl, { /*config: { autoIndex: false }*/ });

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + configs.dbUrl);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed through app termination');
        process.exit(0);
    });
});

if (!module.parent) app.listen(3000);
