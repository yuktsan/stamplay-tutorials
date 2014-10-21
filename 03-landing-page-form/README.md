stamplay-tutorials - 03-landing-page-form
========================================

See how to use the Stamplay Form API to submit a form entry with Angular JS.




-----------------------

## Using the example

For using this example you have to:

* Create a Stamplay app
* Add form component and configure it
* Upload the application's files

## Create a Stamplay app

Go to [Stamplay Editor](https://editor.stamplay.com/) and create a new application.

## Add form component and configure it

Define a form schema for this app, we will define the landing form as follows:
### Settings 
* One entry per user : false
* Only logged user : true

### Landing form
* Name: **email**, Type: **string**, Required : **true**

## Access your data
You can access to the form entries via API at :

* https://24f1ab.stamplay.com/api/form/v0/forms/landing-form/entries

## Upload the application's file

In order to start clone this repository :

    git clone git@github.com:Stamplay/stamplay-tutorials

Or download it as a zip file
	
	https://github.com/Stamplay/stamplay-tutorials/archive/master.zip 

 upload the frontend files of this example in your app and you can do it in two ways:

* Copy/Upload them via the Layout section of your app on Stamplay editor
* Get Stamplay sync [OSX](http://cdn.stamplay.com/stamplay-sync/mac/stamplay-sync.zip), [PC] (http://cdn.stamplay.com/stamplay-sync/win/stamplay-sync.zip) and run **Stamplay Sync**, make it download the frontend assets of your app and then replace them with the ones you got from this repo. Stamplay Sync will upload everything for you on your app.

