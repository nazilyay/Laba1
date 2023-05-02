var express = require("express"),
http = require("http"),
app = express(),
toDos =[
        {
            "description": "Посмотреть напитки",
            "tags": [
                "Напитки",
                "Кофе"
            ]
        },
        {
            "description": "Посмотреть завтраки",
            "tags": [
                "Напитки",
                "Завтрак",
                "Яичница",
                "Каши",
                "Кофе"
            ]
        },
        {
            "description": "Посмотреть ланчи",
            "tags": [
                "Ланч",
                "Бизнес-ланч",
                "Кофе"
            ]
        },
        {
            "description": "Посмотреть акции",
            "tags": [
                "Акции",
                "Скидки",
                "Кофе"
            ]
        }
    ];

    app.use(express.static(__dirname + "/Client"));
    http.createServer(app).listen(3000);
    
    app.get("/todos.json", function (req, res) {
        res.json(toDos);
    });
    
    app.use(express.static(__dirname + "/Client"));
    
    app.use(express.urlencoded({ extended: true }));
    app.post("/todos", function (req, res) { // сейчас объект сохраняется в req.body
        var newToDo = req.body;
        console.log(newToDo);
        toDos.push(newToDo);
    
        res.json({"message":"Вы размещаетесь на сервере!"}); // отправляем простой объект
    });