const knex = require('knex')
const knexfile = require('../knexfile')

const enviroment = process.env.NODE_ENV || 'development'
const config = knexfile[enviroment]

module.exports = knex(config)