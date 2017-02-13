# Development Exercise

### Instructions

1. Copy all files to the server's folder

Eg.
```
/var/www/html/devExercise
```

2. Create a mysql database called **dev_exercise** and use the file "sql/dev_exercise.sql" to import all database contents. The file was generated using **phpmyadmin**

The final result should be a table called "items" with columns 
```
id int(11), description text, image varchar(255), sortorder int(11)
```
Change **server/db.php** according to local database configuration

3. Open the application in the browser.
```
localhost/devExercise/index.html
```

3.1. Click on new Item
3.2. Select a picture
3.3. Fill the textarea
3.4. Click on Save
3.5. Create several items repeating previous steps.
3.6. Drag and drop in order to sort items differently.