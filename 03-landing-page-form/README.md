stamplay-tutorials - 03-landing-page-form
========================================

## What you'll learn

See how to use the Stamplay Form API to submit a form entry.

## Using the example 

- Create an application in the [Stamplay Editor](https://editor.stamplay.com)
- Define a form schema for this app, we will define the landing form with this field:
    * Name: **email**, Type: **string**, Required : **true**
- Configure the form settings as follows:
    * One entry per user : false
    * Only logged user : false
- Use the Stamplay hosting or your own hosting 

## The demo

You can find the complete demo [here](https://landingpage.stamplayapp.com/)

### Stamplay hosting

In order to use the Stamplay hosting you need to: 
- Install the Stamplay [command line tool](https://stamplay.com/docs/hosting)
- Clone the repository
- [Deploy](https://stamplay.com/docs/hosting#deploying) this tutorial

### Your hosting

You can use your own hosting and just make API calls towards Stamplay endpoints.
You need to:
- Drop your files in your own server
- From the [Stamplay Editor](https://editor.stamplay.com), hosting section, add to the CORS settings your domain.