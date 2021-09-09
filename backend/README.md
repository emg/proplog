# PropLog logging back end

# What is this?

A Django-based backend for logging questions and answers from the
PropLog front end.

## Prerequisites

1. A web server

2. sudo / wheel / root access to (1.)

3. Ability to create https certificates. For free from the letsencrypt
project, for example.

4. Ability to install packages on the server.

## How to set up on Ubuntu

### Install required packages

sudo apt-get install apache2 postgresql python3 virtualenv libapache2-mod-wsgi-py3


### Set up PostgreSQL

1. Set up PostgreSQL

# Set the password for user postgres
$ sudo passwd postgres

# Enable, then start the postgresql service
$ sudo systemctl enable postgresql
$ sudo systemctl start postgresql


2. Create PostgreSQL user 'proplog' owning database 'proplog'.

First, grab a password from https://random.org/ or your favorite
source of passwords. Make a note of it. You'll need it later.

Then:

Shift to the super user
```
$ sudo -s
```

Shift user to the postgres user
```
# su - postgres
```

Create the proplog user

```
$ createuser --interactive --pwprompt
Enter name of role to add: proplog
Enter password for new role: <make up something, or use random.org>
Enter it again: <repeat same password>
Shall the new role be a superuser? (y/n) y
```

Create the the database 'proplog' owned by the user 'proplog'

```
$ createdb -O proplog proplog
```

Log out of the postgres user into the root user

```
$ logout
```

Exit from the root user into your own user

```
# exit
```

### Set up a space for the web server files

```
$ sudo mkdir -p /srv/web/default/http/ /srv/web/default/log/
```

### Git clone this repo

You must git clone this repo somewhere where your web server can read
the files. You should probably, however, clone it ouside of the http
space, so that only selected files are visible to the web server.

```
$ cd /srv/web/default
$ sudo mkdir git
$ sudo chown root:www-data git
$ sudo chmod -R 6755 git/
$ cd git
$ sudo git clone https://github.com/emg/proplog.git
```

### Set up a virtualenv

```
$ cd /srv/web/default
$ sudo virtualenv virtualenv
$ sudo virtualenv --python=python3 virtualenv
$ sudo -s
# source /srv/web/default/virtualenv/bin/activate
# pip install --upgrade pip
# cd /srv/web/default/git/proplog/backend/Django/logproplogsite
# pip install -r requirements.txt
# exit
```


### Configure the Django backend

First make a copy of the local_settings.py file for local modification.

```
$ cd /srv/web/default/git/proplog/backend/Django/logproplogsite/logproplogsite
$ sudo cp local_settings.py.template local_settings.py
```

Now edit the loca_settings.py for your needs. Especially set:

- ALLOWED_HOSTS must contain the ServerName (DNS entry) of your web server.
- Set DEBUG = False
- Set DEV = False
- Set the PostgreSQL connection info, including password

```
$ sudo vi local_settings.py
```

### Set up the Django database

First create the database

```
$ source /srv/web/default/virtualenv/bin/activate
$ cd /srv/web/default/git/proplog/backend/Django/logproplogsite
$ python3 manage.py migrate
```

Then, while still having the virtualenv activated, create the web site
Django admin superuser:

```
$ python3 manage.py createsuperuser
```

### Collect Django static files

Collect static files for Django. For this, we need to do it as `sudo
-s` root, since we need to write to directories that are owned by
root.

```
$ sudo -s
# cd /srv/web/default/git/proplog/backend/Django/logproplogsite
# source /srv/web/default/virtualenv/bin/activate
# python manage.py collectstatic
```

### Set up Apache

There are sample Apache .conf files in `proplog/backend/Apache-conf/`.

Other than that, you're on your own here. Please don't follow these
instructions unless you know what they do.

1. Copy these to your Apache `sites-available` directory.

2. Edit them for your local needs. Then enable them with
`a2ensite`. You'll need to also create the letencrypt
certificate. DuckDuckGo is your friend.

### Create the proplog directory in the web server space

```
$ cd /srv/web/default/http
$ sudo mkdir proplog
$ sudo chown -R root:www-data proplog
$ sudo chmod -R 6755 proplog
$ cd proplog
$ sudo ln -s ../../git/proplog/frontend/index.html 
$ sudo ln -s ../../git/proplog/frontend/webapp/ ./applet
$ sudo ln -s ../../git/proplog/frontend/target/ .
$ sudo ln -s ../../git/proplog/backend/Django/logproplogsite/static .
```

### Restart Apache

1. Check if the syntax works OK

   ```sudo apachectl -t```

   If this reports errors, fix them.

2. Restart apache

   ```sudo apachectl restart```



## How to use

1. Once installed, you should be able to go to
`<yourwebsite.example.com>/proplog/` and use the online quiz. This
will show an interactive window with buttons for you to test your
knowledge of propositional logic.

2. If everything has been set up correctly, you will also be able to
go to:

```https://<yourwebsite.example.com>/proplog/admin/```

and log in with the Django username and password which you created in
the configuration steps.

Once there, you can look into the `LOGPROPLOGAPP -> Answers`
collection to see if any answers have been logged.

3. Whenever you want to harvest data from the app, you can, using this
   procedure:

   a. Log into the admin console:

   ```https://<yourwebsite.example.com>/proplog/admin/```

   b. Use one of these URLs to dump the data as CSV files:

      - Streaks:

      ```https://<yourwebsite.example.com>/proplog/logproplog/dump2/```
      
      - Answers plus aggregates:

        ```https://<yourwebsite.example.com>/proplog/logproplog/dump3/```

