# ionic2Auth

Simple authentication starter using Ionic Auth

## Features

 1. Sign In and Sign Up with Email and Password
 2. Log Out
 
 ## ionic View
 
 > 19e42175

----------
### Prerequisites

 - NodeJS
 - NPM
 - Ionic

> You will need to install the latest version of Ionic

    $ npm install -g ionic 


----------
## Getting Started


Clone the repository 


### Install Node Packages

    $ npm install

### Usage

    $ ionic serve


----------
To use with your own Ionic App, you will need to change the App ID to your own.


1. Go to the root of your project and type command:

    $ ionic io init
> This will generate an ionic app ID for your app, skip this step if you already have an app ID

2. Update src/app/app.module.ts with your new app ID

>     const cloudSettings: CloudSettings = {
>     	  'core': {
>     	    'app_id': <yourAppID>
>     	  }
>     	}

