const LostPaw = require('../models/LostPaw');
const LostController = {
    index: async function(ctx) {
        await ctx.render('lost/index', {
            title: 'Lost'
        });
    },

    create_get: async function(ctx) {
        await ctx.render('lost/create_edit_info', {
            title: 'Lost', csrf: ctx.csrf, layout: 'user_main' 
        });
    },

    create_post: async function(ctx) {
    	const body = ctx.request.body;

        ctx.checkBody('lost_date').isDate('Invalide lost date.');
        
        if (ctx.errors)
            await ctx.render('lost/create_edit_info', {
                title: 'Lost',
                csrf: ctx.csrf,
                errors: JSON.stringify(ctx.errors)
            });
        else {

        	const paw = new LostPaw();        

        	paw.lost_date = body.lost_date;
        	paw.zipcode = body.zipcode;
        	paw.location = body.location;
        	paw.breed = body.breed;
        	paw.color = body.color;
        	paw.size = body.size;
        	paw.created_by = 'alexey@gmail.com';

        	await paw.save(function (err) {
			  if (err) {
			    console.log(err);
			    throw error;
			  } else {
			     ctx.redirect('/lost/edit_photos?id=' + paw.id);
			  }
			});
        }
    },

    edit_info_get: async function(ctx) {
        await ctx.render('lost/create_edit_info', {
            title: 'Edit Info', csrf: ctx.csrf, layout: 'user_main' 
        });
    },

    edit_info_post: async function(ctx) {


    },

    edit_photos_get: async function(ctx) {
        await ctx.render('lost/edit_photos', {
            title: 'Edit Photos', layout: 'user_main' 
        });
    },

    edit_photos_post: async function(ctx) {
    	ctx.redirect('/lost/edit_contact');

    },

    edit_contact_get: async function(ctx) {
        await ctx.render('lost/edit_contact', {
            title: 'Edit Contact', csrf: ctx.csrf, layout: 'user_main' 
        });
    },

    edit_contact_post: async function(ctx) {


    },

};

module.exports = LostController;