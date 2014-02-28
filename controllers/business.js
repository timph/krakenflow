'use strict';

var flow = require('../config/flow');
var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();


    app.get(flow.business.url, function (req,res) {
            console.log('model.name ='+ flow.business.page);
            model.name = flow.business.url;
            model.backward = flow.baseURI + flow.home_next.business;
            model.forward = flow.baseURI + flow.business.collect_info;
            res.render(flow.business.page, model);
    });

    app.get(flow.home_next.business, function (req,res) {
            console.log('model.name ='+ flow.home_next.business);
            model.name = flow.home_next.business;
            model.backward = flow.baseURI + flow.home.choice_true;
            model.forward = flow.baseURI + flow.business.collect_info;
            res.render(flow.business.page, model);
    });

    app.get(flow.business.collect_info, function (req,res) {
            console.log('model.name ='+ flow.business.collect_info);
            model.name = flow.business.collect_info;
            model.backward = flow.baseURI + flow.home_next.business;
            model.forward = flow.baseURI + flow.business.next;
            res.render(flow.business.page, model);
    });

};
