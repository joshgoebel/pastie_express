const express = require('express');
const { PastesController }  = require("./controllers/pastes_controller")
const { UtilsController } = require("./controllers/utils_controller")

const { toAsyncRouter } = require("../lib/async_router")
const route = toAsyncRouter(express.Router())

function to(where) {
    [controller, action] = where.split("#")
    var handler = eval(`async (...args) => new ${controller}Controller(...args).handle('${action}')`)
    // var handler = new Function(`return (async (...args) => new ${controller}Controller(...args).handle('${action}'))`)()
    return handler;
}

// routes
route.get("/", to("Pastes#new"))
route.get("/p/:key", to("Pastes#show"))
route.get("/p/:key/raw", to("Pastes#raw"))
route.post("/pastes/create", to("Pastes#create"))
// route.get("/languages", to("Utils#languages"))
route.get("/languages.json", to("Utils#languages"))

exports.routes = route