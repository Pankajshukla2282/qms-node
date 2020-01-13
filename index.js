'use strict'

const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const connectToDatabase = require('./db')

function HTTPError (statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/qms/', async (req, res) => {
  try {
    const { Question } = await connectToDatabase()
    const ques = await Question.findAll()
    console.debug(Question);
    res.send({
      statusCode: 200,
      body: JSON.stringify(ques)
    })
  } catch (err) {
    res.send({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the ques.',
      msg: err.message
    })
  }
})

app.get('/qms/:id', async (req, res) => {
  const id = req.params.id
  try {
    const { Question } = await connectToDatabase()
    const que =  await Question.findByPk(id)
    if (!que) throw new HTTPError(404, `Question with id: ${id} was not found`)
    res.send({
      statusCode: 200,
      body: JSON.stringify(que)
    }) 
  } catch (err) {
    res.send({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not fetch the Question.',
      msg: err.message
    })
  }
})

app.post('/qms/', async (req, res) => {
  try {
    console.log("insert")
    console.debug(req)
    const title = req.body.title;
    const description = req.body.description;
    const options = JSON.stringify(req.body.options);

    const { Question } = await connectToDatabase()
    
    const que =  await Question.create({
      title: title,
      options: options,
      description: description,
      createdAt: 'CURRENT_TIME()',
      updatedAt: 'CURRENT_TIME()'
    })
    res.send({
      statusCode: 200,
      body: JSON.stringify(que)
    })
  } catch (err) {
    res.send({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the que.',
      msg: err.message
    })
  }
})

app.put('/qms/:id', async (req, res) => {
  console.log("update")
  console.debug(req)
  const { id } = req.params
  try {
    const input = req.body
    const { Question } = await connectToDatabase()
    const que =  await Question.findByPk(id)
    if (!que) throw new HTTPError(404, `Question with id: ${id} was not found`)
    if (input.title) que.title = input.title;
    if (input.description) que.description = input.description;
    if (input.options) que.options = JSON.stringify(req.body.options);
    que.save()    
    res.send({
      statusCode: 200,
      body: JSON.stringify(que)
    })
  } catch (err) {
    res.send({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not update the Question.',
      msg: err.message
    })
  }
})

app.delete('/qms/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { Question } = await connectToDatabase()
    const que =  await Question.findByPk(id)
    if (!que) throw new HTTPError(404, `Question with id: ${id} was not found`)
    que.destroy()
    res.send({
      statusCode: 200,
      body: JSON.stringify(que)
    })
  } catch (err) {
    res.send({
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could destroy fetch the Question.',
      msg: err.message
    })
  }
})

app.all('*', function(req, res) {
  res.send({
    statusCode: 500,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Route not found!!'
  })
})

// wrap express app instance with serverless http function
module.exports.handler = serverless(app)
