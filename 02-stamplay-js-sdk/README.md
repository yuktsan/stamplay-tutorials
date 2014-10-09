stamplay-tutorials - 02-stamplay-js-sdk
========================================

See how to use the Stamplay JavaScript SDK to recreate with AngularJS a simple TodoMVC.




-----------------------

## Using the example

For using this example you have to:

* Create a Stamplay app
* Add custom object component and configure it
* Upload the application's files

## Create a Stamplay app

Go to [Stamplay Editor](https://editor.stamplay.com/) and create a new application.

## Add custom object component and configure it

Define the entity for this app, we will define the Tag custom object as follows:

### Tag
* Name: **title**, Type: **string**, Required : **true**
* Name: **completed**, Type: **boolean**, Required : **true**
* Name: **user**, Type: **string**, Required : **true**


## Upload the application's file

In order to start clone this repository :

    git clone git@github.com:Stamplay/stamplay-tutorials

Or download it as a zip file
	
	https://github.com/Stamplay/stamplay-tutorials/archive/master.zip 

 upload the frontend files of this example in your app and you can do it in two ways:

* Copy/Upload them via the Layout section of your app on Stamplay editor
* [Get Stamplay sync](http://cdn.stamplay.com/stamplay-sync/stamplay-sync.zip) and run **Stamplay Sync**, make it download the frontend assets of your app and then replace them with the ones you got from this repo. Stamplay Sync will upload everything for you on your app.

