exports.performEvent = function(obj) {
	return new Promise(function(resolve, reject){
		var triggerEvent;
    	if( obj.eventType == "get" ) {
			triggerEvent = getURL(obj);
		} else if (obj.eventType == "click") {
			triggerEvent = clickObj(obj);
		} else if (obj.eventType == "wait" ) {
			triggerEvent = waitForObj(obj);
		} else if (obj.eventType == "type" ) {
			triggerEvent = inputObj(obj);
		}
		
		if (triggerEvent) {
			triggerEvent.then(function(){
				resolve();		
		    }); 			
		}

  	});
};

var getURL = function (obj) {
	return driver.get(obj.attr);
};

var clickObj = function (obj) {
	if(obj.type == "id" ) {
		return driver.elementById(obj.attr).click();	
	} 
	if(obj.type == "css" ){
		return driver.elementByCss(obj.attr).click();
	}
	if(obj.type == "xpath"){
		return driver.elementByXPath(obj.attr).click();	
	}
};

var waitForObj = function(obj) {
	if (obj.type == "id") {
		return driver.waitForElementById(obj.attr, obj.value).text();
	}
	if (obj.type == "css") {
		return driver.waitForElementByCss(obj.attr, obj.value).text();
	} 
	if (obj.type == "time") {
		return driver.setWaitTimeout(30000);
	}
};

var inputObj = function(obj) {
	if (obj.type == "id") {
		return driver.elementById(obj.attr).clear().sendKeys(obj.value);
	}
	if (obj.type == "css") {
		return driver.elementByCss(obj.attr).clear().sendKeys(obj.value);
	}
	if(obj.type == "xpath"){
		return driver.elementByXPath(obj.attr).clear().sendKeys(obj.value);	
	}
}