# feedReaderApp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Build & development

Clone the project using:
   
    git clone https://github.com/david1983/feedReaderApp.git

To run the application you will need to install npm and NodeJS.

I advice to use nvm which is the node version manager so you can easily swap between different version of node.
You can install nvm using: 

    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

then install NodeJS:

    nvm install 0.12
    nvm alias default 0.12
    node -v

Install Bower package manager using npm:

    npm install bower -g
    
Run the installation for the dependancies

   npm install && bower install

Install compass in order to convert scss files

    sudo apt-get update
    sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties
    sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
    
install rvm to handle different version of ruby

    curl -L https://get.rvm.io | bash -s stable
    source ~/.rvm/scripts/rvm
    echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
    rvm install 2.1.2
    rvm use 2.1.2 --default
    ruby -v

install compass
    gem install compass



Run `grunt` for building and `grunt serve` for preview.

