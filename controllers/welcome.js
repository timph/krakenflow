'use strict';
var url=require('url');
var flow = require('../config/flow');
var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();

    app.get(flow.welcome.url, function (req,res) {
            var queryData = url.parse(req.url, true).query;
            model.name = flow.welcome.page;
            model.query = queryData.entity;
            if (queryData.entity === "business") {
                model.backward = flow.baseURI + flow.home.choice_true;
            } else {
                model.backward = flow.baseURI + flow.home.choice_false;
            }
            res.render(flow.welcome.page, model);
    });

};
