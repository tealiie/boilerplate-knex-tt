var express = require('express')
var development = require('../knexfile').development
var knex = require('knex')(development)

module.exports = {
  get: get,
  profile: profile,
  createUser: createUser
}

function get (req, res) {
  knex('users')
    .select()
    .then(function (users) {
      res.render('index', { users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function profile (req, res) {
  knex('profiles')
    .join('users', 'profiles.user_id', '=', 'users.id')
    .select('users.name', 'profiles.url', 'profiles.school')
    .where('users.id', '=', req.params.id)
    .then(function (users) {
      res.render('profile', { user: users[0] })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function createUser (req, res) {
  knex('users')
    .insert({name: req.body.name, email: req.body.email})
    .then(function (ids) {
      return knex('profiles')
        .insert({user_id: ids[0], url: req.body.url, school: req.body.school})
    })
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      res.status(500).send(err.message)
    })
}
