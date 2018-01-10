# firebase-ai-groupchat
Group chat widget based on HTML/CSS/JS, Firebase, Dialogflow

## Installation
* Setup a Firebase account on https://firebase.google.com/
* Create a Google project in the Firebase console
* Setup a DialogFlow account on https://console.dialogflow.com/api-client/#/login
* Link your Google project with Dialogflow
* Initialize API by passing your Firebase API key and Dialogflow Access Token as options
```javascript
var fcg = new FirebaseAIGroupChat({firebaseAPIKey:"",dialogflowAccessToken:""});
```

## Usage
* **Generate a Dialogflow response:** Call the ``` getDFResponse(message, beforeSendFunc, successFunc, errorFunc) ``` javascript function to generate a Dialogflow response for a message
  ```javascript
  fcg.getDFResponse(message, beforeSendFunc, successFunc, errorFunc);
  ```
* **Trigger a Dialogflow event:** Call the ``` triggerDFEvent(eventName, beforeSendFunc, successFunc, errorFunc) ``` javascript function to trigger a Dialogflow event such as *WELCOME*
  ```javascript
  fcg.triggerDFEvent('WELCOME', beforeSendFunc, successFunc, errorFunc);
  ```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b firebase-ai-groupchat`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin firebase-ai-groupchat`
5. Submit a pull request :D

## History
* Version 1.0: Chat interface with automatic responses generated using Dialogflow

## Credits
Messaging interface based on Fabio Ottaviani's work on codepen: http://cdpn.io/jqOBqp

## License
MIT license