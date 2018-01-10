function FirebaseAIGroupChat (options) {
	self = this;

	self.settings = $.extend({
		firebaseAPIKey: "",
		dialogflowSessionId: Math.floor(Math.random() * 1000000),
		dialogflowLang: "en",
		dialogflowAccessToken: "",
		dialogflowBaseUrl: "https://api.dialogflow.com/v1/query?v=20150910"
	}, options );

	self.getDFResponse = function(message, beforeSendFunc, successFunc, errorFunc) {
		$.ajax({
			type: "POST",
			url: self.settings.dialogflowBaseUrl,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + self.settings.dialogflowAccessToken
			},
			data: JSON.stringify({
				query: message,
				lang: self.settings.dialogflowLang,
				sessionId: self.settings.dialogflowSessionId
			}),
			beforeSend: function(){beforeSendFunc()},
			success: function(data){successFunc(data)},
			error: function(data){errorFunc(data)}
		});
	}

	self.triggerDFEvent = function(eventName, beforeSendFunc, successFunc, errorFunc) {
		$.ajax({
			type: "POST",
			url: self.settings.dialogflowBaseUrl,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: {
				"Authorization": "Bearer " + self.settings.dialogflowAccessToken
			},
			data: JSON.stringify({
				event: {
					name: eventName
				},
				lang: self.settings.dialogflowLang,
				sessionId: self.settings.dialogflowSessionId
			}),
			beforeSend: function(){beforeSendFunc()},
			success: function(data){successFunc(data)},
			error: function(data){errorFunc(data)}
		});
	}
}