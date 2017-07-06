const LostController = {
	index: async function(ctx){
		await ctx.render('lost/index', { title: 'Lost'});
	},

	create_get: async function(ctx){
		await ctx.render('lost/create', { title: 'Lost'});
	},

	create_post: async function(ctx){	
		
		ctx.checkBody('email').isEmail('Invalide email.');
		ctx.checkBody('password').notEmpty().len(6,20).md5();
		ctx.checkBody('confirmPassword').eq(pwd, 'Password not identical.');
		if(ctx.errors)
			await ctx.render('lost/create', { title: 'Lost', csrf: ctx.csrf, errors: JSON.stringify(ctx.errors)});
		else{
			
			ctx.redirect('/lost/index');
		}
	},

};

module.exports = LostController;