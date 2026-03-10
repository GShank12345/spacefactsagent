Project Title: Space fact agent

Description : Agent states facts about space with a math problem while answering user related quesries.

Lambda functions index.js is used to get the Amazon Bedrock key and encrypt it and send it via API gateway to function.

Dependencies : Expo Go - for hosting the application, JavaScript - Frontend, backend calling, UI 
              crypto-js - for encrypting the OpenAI and hugging face model keys, 
              Lambda dependencies: ask-sdk-core, ask-sdk-model 
              Amazon Nova AI model for getting Space facts and answering user queries.

Instalation:
The application is deployed in Expo. Link to run the document in the web -(https://spacechunks-gsapp.expo.app)

Modifications Include environment variables for the Lambda function for the OpenAI key. API Function Call - Generate API trigger for the Lambda function and include it in your Javascript application to include the 'https' url to fetch.

Executing program

Click once to play or stop the audio button in the web app.
Type in the user query and press Enter/Return for the space agent to return an answer.
Click the text 'Click for next fact'

Help

    Increase the token parameter model to extract more text and image display.
    Change inference parameters for randomness.


License

This project is licensed under the Apache License - see the LICENSE.md file for details
