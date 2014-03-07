'use strict';

var flow = require('./config/flow')
    ,kraken = require('kraken-js')
    ,pplinkpath = require('pplinkpath')
    ,app = {};


app.configure = function configure(nconf, next) {
    // Async method run on startup.
    // add any change to configuration here
    console.log("Configuration changes from app.json " + nconf.get("requestURI"));
    console.log("Configuration changes from middleware.json " + nconf.get("middleware").errorPages['404']);
    console.log("Configuration env = \n");
    console.log(nconf.get("env"));
    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.
    // request interceptor for all requests
    console.log("Request interceptor for all requests");
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Run before any routes have been added.
    // request interceptor for certain routes
    server.use( function (req, res, next) {

        // set up pp baseURL for css, js and static files
        pplinkpath.linksBuilder(req.host, res);

        // TEST set up session value
        req.session.key = "check this key";
        res.locals.whatever = "whatever you need or from nconf";
        next();
    });
    console.log("Request interceptor for certain requests");
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.
    // interceptor after route set
    console.log("Request after Route set");
};


if (require.main === module) {
    kraken.create(flow.baseURI, app).listen(function (err) {
        if (err) {
            console.error(err);
        }
    });
}


module.exports = app;
