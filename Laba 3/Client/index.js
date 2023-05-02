var express = require("express"),
http = require("http"),
app = express(),
toDos = [
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
        "description":  "Посмотреть ланчи",
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
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);
// этот маршрут замещает наш файл
// todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
    res.json(toDos);
    });