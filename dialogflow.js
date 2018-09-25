const dialogflow = require('dialogflow');

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = 'quickstart-session-id';
const languageCode = 'id-ID';

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const createRequest = queryText => ({
  session: sessionPath,
  queryInput: {
    text: {
      text: queryText,
      languageCode
    }
  }
});

module.exports = {
  sendRequest: queryText => {
    const request = createRequest(queryText);
    return sessionClient.detectIntent(request);
  }
};
