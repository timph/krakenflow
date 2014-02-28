'use strict';

var flow = require('../config/flow');
var IndexModel = require('../models/index');

module.exports = function (app) {

    var model = new IndexModel();


    app.get(flow.personal.url, function (req,res) {
            model.name = flow.personal.page;
            model.backward = flow.baseURI + flow.home_next.personal;
            model.forward = flow.baseURI + flow.personal.next;
            res.render(flow.personal.page, model);
    });

    app.get(flow.home_next.personal, function (req,res) {
            model.name = flow.home_next.personal;
            model.backward = flow.baseURI + flow.home.choice_false;
            model.forward = flow.baseURI + flow.personal.next;
            res.render(flow.personal.page, model);
    });

    app.get(flow.personal.collect_info, function (req,res) {
            model.name = flow.personal.collect_info;
            model.backward = flow.baseURI + flow.home_next.personal;
            model.forward = flow.baseURI + flow.personal.next;
            res.render(flow.personal.page, model);
    });

};
