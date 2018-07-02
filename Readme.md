How to Run App

Steps: 
    1. navigate to project root folder from terminal
    2. run "npm i"
    3. put your credentials of twilio account in .env file
    4. finally run "npm start"
    5. now open browser and go to "http://localhost:3000/first"

Dummy Data: 
    For now the contacts can be updated by changing the contacts info in the /data/contacts.json file from project root folder.

Functionality:
    1. On first page there will be two tabs which will toggle between contact lists and history     of successfully sent messages.
    2. Click on any contact to send a message.
    3. Now second screen will appear which will confirm the send message action for the specified   user.
    4. Now third screen will appear where you can edit the text and OTP will be generated here      automatically.
    5. On the success or failure of sms sending action a notification will be displayed and on s    success user will be redirected to first page.

Improvements:
    1. The view templates are rendered on client side, which can be moved to server side            rendering which helps in abstraction of data layer from getting exposed on client side.
    2. Database can be attached instead of plain json stores.
