# Status Reporting Server
This project provides REST functionality to Status Reporting project. This is enable updating status from the Slack and then webhook has been attached to the server which updates the status on slack by making a request to the slack whenevre there is new status in the Database.

First install the dependencies by running following command:    
```
npm install
```

Then run the server by following command:     
```
node server.js
```    

P.S. You will be required to set the webhooks to receive the update on the slack.