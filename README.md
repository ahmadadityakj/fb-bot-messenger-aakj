# faceboook messenger bot
- this is sample of messenger bot build using nodejs integrate with facebook messenger chatbot
- this bot will ask your firstname, birthdate and can count how many days until your next birthday
- Test this at https://fb-bot-messenger-aakj.herokuapp.com/

## How to run this project ? 
- Clone this project
- Copy file .env.example as .env file and put at the root folder 
- Set all variables in the .env file [VERIFY_FB_TOKEN=randomstring | FB_PAGE_TOKEN=yourfacebookpageaccesstoken]
- Run "npm install" to setup the project
- Run "npm start" to test project at the localhost

## Additional information
I put this project at heroku to test facebook chat messenger functionality. We need to setup heroku, facebook page and facebook app messenger.
### 1. Create a Heroku app
- Deploy app to Heroku ( need to setup dev dependencies:
heroku config:set NPM_CONFIG_PRODUCTION=false
)
- Config env variables (setup dev dependencies)
### 2. Facebook Page
- Create a Facebook Page
- Config Whitelisted Domains (add the Heroku app domain)
### 3. Facebook App
- Create a Facebook App
- Config webhook
- Add Facebook chat plugin into your website