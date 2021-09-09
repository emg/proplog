# PropLog logging back end

## What is this?

A Django-based backend for logging questions and answers from the
PropLog front end.

## How to set up and configure

See the file `SETUP_AND_CONFIGURATION.md`.


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

