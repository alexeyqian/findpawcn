
//const path = require('path');
const Koa = require('koa');
const router = require('./router');
const hbs = require('koa-hbs')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const passport = require('./auth');


const app = module.exports = new Koa();
require('koa-validate')(app);
//app.proxy = true;
app.keys = ['your-session-secret', 'csrf-secret'];

// middleware: request logger
async function reqLogger(ctx, next){
	console.log('%s - %s %s',new Date().toISOString(), ctx.req.method, ctx.req.url);
	await next();
}
app.use(reqLogger);

app.use(bodyParser());
app.use(session(app));

app.use(new CSRF());

app.use(passport.initialize());
app.use(passport.session());

// clear flash after if it was actually set (so on the next request)
app.use(async (ctx, next) => {  
  ctx.session.flash = this || undefined; // shorthand for if
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

if (!module.parent) app.listen(3000);