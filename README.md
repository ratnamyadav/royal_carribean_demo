# Royal Carribean Notification Demo Setup

## Steps

- [Install Node](#installing-node)
- [Install Mongodb](#installing-mongodb)
- [Setup Project](#setup-project)
- [Setup WEB API on Spectralink mobile](#setup-web-api-on-spectralink-mobile)

## Setup

Here we are providing steps to setup the project on a Mac machine

## Installing Node

We have two methods to install node. 
If we want to install multiple versions of node you can use NVM or install directly using brew.

### Using NVM

1. Press Command+Space and type Terminal and press enter/return key.

2. If brew is not installed then run in Terminal app:
```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null```
and press enter/return key. 
If the screen prompts you to enter a password, please enter your Mac's user password to continue. When you type the password, it won't be displayed on screen, but the system would accept it. So just type your password and press ENTER/RETURN key. Then wait for the command to finish.

3. Run:
```brew install nvm```

4. Now you can install the required node version with command 
```nvm install 10.11.0```

### Without NVM

```brew install node```

## Installing MongoDB

1. Open the Terminal app and type ```brew update```
2. After updating Homebrew ```brew install mongodb```
3. After downloading Mongo, create the “db” directory. This is where the Mongo data files will live. You can create the directory in the default location by running ```mkdir -p /data/db```
4. Make sure that the /data/db directory has the right permissions by running
```
> sudo chown -R `id -un` /data/db
> # Enter your password
```
5. Run the Mongo daemon, in one of your terminal windows run ```mongod```. This should start the Mongo server.

## Setup Project

1. Clone repository
```git clone git@github.com:ratnamyadav/royal_carribean_demo.git```

2. Go to the project root in Terminal and install npm packages using command: 
```npm install```

3. After packages installed successfully then you can start the application using command: 
```npm run start```

4. Open application in browser http://localhost:3000

There are two main aspects in the app Users and Notifications defined below

### Users

Here we add all the users having Spectralink mobile. We have a link in sidebar Users to view all users.

![Users](/readme_images/users.jpg)

In above image Name specifies name of the User. Username, 
Password and IP Address we get from Spectralink mobile.
We can add more Users by clicking on Add Users button and adding all the information in form and submitting.

![Users](/readme_images/users-add.jpg)

### Notifications

![Users](/readme_images/notifications.jpg)
Here we list all the notifications sent yet with time notification was sent, 
no. of recipient and Message sent. 
We can send more notifications by clicking on add notifications.
We need to have Users in our system to be able to send notifications.

![Users](/readme_images/notifications-create.jpg)
Here we have a form to create a notification. 
We have a multiselect field where we can select which Users we need to send the notifications to.
We can add the message in textarea field and click on send notifications and it will send notifications accordingly.

## Setup WEB API on Spectralink mobile
