'use strict';

var url = require('url');
var flow = require('../config/flow');
var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();


    app.get(flow.home.url, function (req,res) {
            var queryData = url.parse(req.url, true).query;
            model.name = flow.home.page;
            model.query = JSON.stringify(queryData);

            // check values set from beforeRoutes
            console.log("req.session.key="+req.session.key);
            console.log("res.locals.whatever="+res.locals.whatever);

            res.render(flow.home.page, model);
    });

    app.post(flow.home.url, function (req, res) {
        console.log('req.body.choice.option='+req.body.choice.option);
        var value = req.body.choice.option;
        if (value === 'business') {
            console.log('redirect to ' + flow.home_next.business);
            res.redirect(flow.baseURI + flow.home_next.business);
        } else if (value === 'personal') {
            console.log('redirect to ' + flow.home_next.personal);
            res.redirect(flow.baseURI + flow.home_next.personal);
        } else {
            console.log('flow.home='+flow.home);
            res.render(flow.home.page, model);

        }
    });
};
