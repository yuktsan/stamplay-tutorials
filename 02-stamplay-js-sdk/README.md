stamplay-tutorials - 02-stamplay-js-sdk
========================================

## What you’ll learn

This tutorial explains how to create a simple TodoMVC using Stamplay JavaScript SDK and AngularJS.

## The demo

You can find a functioning demo here: https://stamplaytodo.stamplayapp.com/

## Using this example 

- Open the [Stamplay Editor](https://editor.stamplay.com) and create a new application.
- Create a new custom object and name it `todo`.
- Add two fields to the custom object
  | * Name: **title**, Type: **string**, Required: **true**
  | * Name: **completed**, Type: **boolean**, Required: **true**
- Run Bower Install to install the dependencies.
- Deploy the static files on Stamplay hosting or on your server.

### Use Stamplay hosting

In order to use the Stamplay hosting you need to: 
- Install the Stamplay [command line tool](https://stamplay.com/docs/hosting)
- Clone this repository
- [Deploy](https://stamplay.com/docs/hosting#deploying) the files in the folder 02-stamplay-js-sdk

### Use your hosting

You can use your own hosting and just make API calls towards Stamplay endpoints. You need to:
Deploy the files in the folder 02-stamplay-js-sdk
Open your app in the [Stamplay Editor](https://editor.stamplay.com), select Hosting from the main menu and add your domain to the CORS settings 
