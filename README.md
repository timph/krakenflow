# krakenworkflow

This app demonstrates simple workflow setup for any Node app.
The app is built from KrakenJS with simple build command
```bash
$ yo kraken
```
after you have Node and Kraken set up according to this:

1. [Set up your node.js environment](https://github.paypal.com/NodeJS/getting-started/blob/master/README.md)
2. [Create a kraken application](https://github.com/paypal/kraken-js/blob/master/README.md#getting-started)

## References

This app is following the guidelines in deploying PayPal NodeJS App to Stage for
[Integrated Stage Deploy](https://confluence.paypal.com/cnfl/display/nodejs/Integrated+Stage+Deploy)

## Workflow Details

For a node app, an application flow can simply define in a single file. I added flow.js in /config directory.

```javascript
var flow = {};                                                                                                          
                                                                                                                        
flow.baseURI = "/krakenflow"; // matching requestURI in app.json                                                        
                                                                                                                        
// In your controller, when you do request.redirect(flow), you need to add flow.baseURI to the flow of choice           
// Controllers automatically padded 'express'.requestURI configured in app.json to each URI of app.get/.post() call     
                                                                                                                        
flow.home = {                                                                                                           
                        "page": "index"                                                                                 
                        ,"url": "/index"                                                                                
                        ,"choice_true": "/index/?choice=true"                                                           
                        ,"choice_false": "/index/?choice=false"                                                         
                        };                                                                                              
flow.home_next = {                                                                                                      
                        "business": "/business/step"                                                                    
                        ,"personal": "/personal/step"                                                                   
                        };                                                                                              
flow.business = {                                                                                                       
                        "page": "business"                                                                              
                        ,"url": "/business"                                                                             
                        ,"collect_info": "/business/info"                                                               
                        ,"moveback": flow.home_next.business                                                            
                        ,"next": "/welcome?entity=business"                                                             
                        };                                                                                              
flow.personal = {                                                                                                       
                        "page": "personal"                                                                              
                        ,"url": "/personal"                                                                             
                        ,"collect_info": "/personal/info"                                                               
                        ,"moveback": flow.home_next.personal                                                            
                        ,"next": "/welcome?entity=personal"                                                             
                        };                                                                                              
flow.welcome = {                                                                                                        
                        "page": "welcome"                                                                               
                        ,"url": "/welcome"                                                                              
                    };                                                                                                  
                                                                                                                        
module.exports = flow;  

```

To use flow in your controllers, there are only a few things to keep in mind:

1. In your controller, when you do request.redirect(flow), you need to add flow.baseURI to the flow of choice           
2. Controllers automatically padded 'express'.requestURI configured in app.json to each URI of app.get/.post() call

This is the controllers/index.js content:
```javascript
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
```

A render call just use regular 'home.page' which is the name of your dust template
A redirect call, on the other hand, will have to add flow.baseURI to the forwarded URI. It is because ExpressJS only added requestURI that we defined in app.json to all the URL of app.get()/post() calls, so that the app can map your correct app URL to your controller calls.

That is all to it. You can run the app with simple command:
```bash
npm start
or
nodemon start (to get your app restarted automatically with any change while you're developing)
```

On your browser, you can access the app at

* [http://localhost:8000/krakenflow/index](http://localhost:8000/krakenflow/index)

You can follow the link to the last page 'welcome'. The 'Back' link will send you back to the beginning.

* 'Business' flow will have the choice = true
* 'Personal' flow will have the choice = false

