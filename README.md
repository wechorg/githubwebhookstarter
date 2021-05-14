# github webhook starter

Starter Express app to receive GitHub webhook in your local environment for testing. Can be used for both receiving manual hooks (created by the user directly) or as the endpoint to a GitHub App where the events are sent

## Installation instructions

You will need NodeJS in your local dev environment to continue.Head over to a https://nodejs.org/en/ and install

Start a new channel for receiving the webhook using smee - https://smee.io/. Note the webhook URL it provides

Install the `smee` and `nodemon` node module globally

```bash
npm install smee -g
npm install nodemon -g
```
Clone this repository in your local computer and run `npm install` or `yarn install` inside the cloned repository.

Run `nodemon` to start the server.

Open a new terminal and run the following command (replace the smee URL with the one that was generate for you ealier)

```bash
smee -u https://smee.io/gEbidsOo7VfElvPW --target http://127.0.0.1:8080/
```
You should now be receving the webhooks in your local environment.

