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

// Test values
console.log(flow.home.page);
console.log(flow.home.url);
console.log(flow.home.choice_true);
console.log(flow.home.choice_false);
console.log();
console.log(flow.home_next.business);
console.log(flow.home_next.personal);
console.log();
console.log(flow.business.page);
console.log(flow.business.url);
console.log(flow.business.collect_info);
console.log(flow.business.moveback);
console.log(flow.business.next);
console.log();
console.log(flow.personal.page);
console.log(flow.personal.url);
console.log(flow.personal.collect_info);
console.log(flow.personal.moveback);
console.log(flow.personal.next);
console.log();
console.log(flow.welcome.page);
console.log(flow.welcome.url);
