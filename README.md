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
<br/>
```
> sudo chown -R `id -un` /data/db
> # Enter your password
```
5. Run the Mongo daemon, in one of your terminal windows run ```mongod```. This should start the Mongo server.

## Setup Project

## Setup WEB API on Spectralink mobile
