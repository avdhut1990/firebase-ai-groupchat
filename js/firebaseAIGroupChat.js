function FirebaseAIGroupChat (options) {
	self = this;

	self.settings = $.extend({
		firebaseAPIKey: "",
		dialogflowSessionId: Math.floor(Math.random() * 1000000),
		dialogflowLang: "en",
		dialogflowAccessToken: "",
		dialogflowBaseUrl: "https://api.dialogflow.com/v1/query?v=20150910",
		emailId: "",
		password: "",
		firebaseUserIdToken: "",
		firebaseUserLocalId: "",
		firebaseUserRefreshToken: ""
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

	self.signInUser = function(){
		$.ajax({
			type: "POST",
			url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?print=silent&key="+self.settings.firebaseAPIKey,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({
				email: self.settings.emailId,
				password: self.settings.password,
				returnSecureToken: true
			}),
			success: function(data) {
				console.log("User sign-in successful.");
				self.settings.firebaseUserIdToken = data.idToken;
				self.settings.firebaseUserLocalId = data.localId;
				self.settings.firebaseUserRefreshToken = data.refreshToken;
				setTimeout(function(){ self.signInUser(); }, Number(data.expiresIn)*1000);
			},
			error: function(data) {
				var errorCode = data.responseJSON.error.message;
				console.log("User sign-in failed: "+errorCode);
				if (errorCode == "EMAIL_NOT_FOUND"){
					signUpUser();
				}
			}
		});
	}

	self.signUpUser = function(){
		$.ajax({
			type: "POST",
			url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?print=silent&key="+self.settings.firebaseAPIKey,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({
				email: self.settings.emailId,
				password: self.settings.password,
				returnSecureToken: true
			}),
			success: function(data) {
				console.log("User sign-up successful.");
				self.settings.firebaseUserIdToken = data.idToken;
				self.settings.firebaseUserLocalId = data.localId;
				self.settings.firebaseUserRefreshToken = data.refreshToken;
				setTimeout(function(){ signInUser(); }, Number(data.expiresIn)*1000);
			},
			error: function(data) {
				var errorCode = data.responseJSON.error.message;
				console.log("User sign-up failed: "+errorCode);
			}
		});
	}
}