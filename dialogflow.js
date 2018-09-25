const dialogflow = require('dialogflow');

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = 'quickstart-session-id';
const languageCode = 'id-ID';

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const createMessage = queryText => ({
  session: sessionPath,
  queryInput: {
    text: {
      text: queryText,
      languageCode
    }
  }
});

const createEvent = (eventName, params) => ({
  session: sessionPath,
  queryInput: {
    event: {
      name: eventName,
      parameters: { ...params },
      languageCode
    }
  }
});

module.exports = {
  sendMessage: queryText => {
    const message = createMessage(queryText);
    console.log(queryText);
    return sessionClient.detectIntent(message);
  },
  sendEvent: (eventName, params) => {
    const event = createEvent(eventName, params);
    console.log(event, event.queryInput.event.parameters);
    return sessionClient.detectIntent(event);
  }
};
