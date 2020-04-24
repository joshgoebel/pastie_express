process.env.NODE_ENV = process.env.NODE_ENV || "development";

const knexConfig = require("./database")[process.env.NODE_ENV]
const knex = require("knex")(knexConfig)
const { Model } = require('objection');
Model.knex(knex);