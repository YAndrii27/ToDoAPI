# ToDoApp (Backend-only)
Backend for the todo app.

It can be used as API or as web-app if you add static files (CSS, JS, images etc.) in the ```/static/``` folder and add [pug](https://pugjs.org/api/getting-started.html) templates to the ```/views/``` folder.  
  
User can add, edit and remove tasks.  
Also project has authorisation system (login and registation with session expiration and using cookies)  

### Installation:  
  
Clone git repository:   
```git clone https://github.com/YAndrii27/to-do-app```  
  
Change working dir to cloned repo:  
```cd to-do-app```  
  
Install dependencies:  
```npm install```
  
Create .env with template:
```mv .env-example .env```  
  
Edit .env file for your requirements  
  
Start the app:
```npm start```