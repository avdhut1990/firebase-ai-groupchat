# firebase-ai-groupchat
Group chat widget based on HTML/CSS/JS, Firebase, Dialogflow
## Installation
* Setup a Firebase account on https://firebase.google.com/
* Create a Google project in the Firebase console
* Setup a DialogFlow account on https://console.dialogflow.com/api-client/#/login
* Link your Google project with Dialogflow
* Assign your Firebase API key and Dialogflow Access Token to variables **firebaseAPIKey** & **dialogflowAccessToken** in ``` initChat() ``` function in js/chat.js
## Usage
* **Trigger a Dialogflow event:** Call the ``` triggerDFEvent(eventName) ``` javascript function to trigger a Dialogflow event such as *WELCOME*.
  Example:
  ```javascript
  triggerDFEvent('WELCOME');
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