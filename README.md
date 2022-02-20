# APE-Assignment

A heavy equipment scheduler app running on NodeJS / Express. 
Project will follow the Model, View, Controller (MVC) software design pattern, Commonly used to implement user interfaces, data, and controlling logic. It emphasizes a separation between the software's business logic and display. This "separation of concerns" provides for a better division of labor and improved maintenance.

Datastore will be a JSON file accessible via NodeJS built-in 'fs' module.
A simple driver `db.js` is created to read and write to `fileStore.json`
And the models file, `model>excavator.js` and `model>schedule.js` are responsible for extracting the relevant information from the datastore.

`controller>main.js` will be responsible for performing business logic, while the public `view` folder will be responsible for calling the APIs and displaying the information in the prescribed assignment format.

```
PROJECT STRUCTURE  

├── /node_modules*
├── /helpers
├── /model
│ ├── excavators.js
│ └── schedule.js
├── /view
│ ├── /scripts
│ ├── /stylesheets
│ ├── schedule.html
│ ├── excavators.html
│ └── index.html
├── /controllers
│ └── main.js
├── index.js
├── db.js
├── fileStore.json
├── package.json
└── README.md
```

Backend APIs will conforms as close as possible to the constraints of REST architectural style and allows for interaction with RESTful web services.

`GET > /api/excavators` - List all excavators  
`POST > /api/excavators` - Add new excavator  
`GET > /api/schedule` - Get schedules  
`POST > /api/schedule` - Add new schedule  

### Instructions
1. Clone this repository: [ape-proj](https://www.github.com/scott88lee/ape-proj.git)  
  
2. CD into the folder and run `npm install`  

3. Start the app by executing `npm run start` or `node index.js`

4. Point broswer into  	[localhost:8080](http://localhost:8080/)


