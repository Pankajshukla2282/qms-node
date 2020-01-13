'use strict'

const connectToDatabase = require('./db')
function HTTPError (statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

module.exports.healthCheck = async () => {
  await connectToDatabase()
  console.log('Connection successful.')
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Connection successful.' })
  }
}

module.exports.home = async () => {
  try {
    //const { Question } = await connectToDatabase()
    //const ques = await Question.findAll()

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the ques.'
    }
  }
}

module.exports.create = async (event) => {
  try {
    const { Question } = await connectToDatabase()
    const que = await Question.create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: JSON.stringify(que)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the que.'
    }
  }
}

module.exports.getOne = async (event) => {
  try {
    const { Question } = await connectToDatabase()
    const que = await Question.findByPk(event.pathParameters.id)
    if (!que) throw new HTTPError(404, `Question with id: ${event.pathParameters.id} was not found`)
    return {
      statusCode: 200,
      body: JSON.stringify(que)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not fetch the Question.'
    }
  }
}

module.exports.getAll = async () => {
  try {
    const { Question } = await connectToDatabase()
    const ques = await Question.findAll()
    return {
      statusCode: 200,
      body: JSON.stringify(ques)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the ques.'
    }
  }
}

module.exports.update = async (event) => {
  try {
    const input = JSON.parse(event.body)
    const { Question } = await connectToDatabase()
    const que = await Question.findByPk(event.pathParameters.id)
    if (!que) throw new HTTPError(404, `Question with id: ${event.pathParameters.id} was not found`)
    if (input.title) que.title = input.title
    if (input.description) que.description = input.description
    await que.save()
    return {
      statusCode: 200,
      body: JSON.stringify(que)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not update the Question.'
    }
  }
}

module.exports.destroy = async (event) => {
  try {
    const { Question } = await connectToDatabase()
    const que = await Question.findByPk(event.pathParameters.id)
    if (!que) throw new HTTPError(404, `Question with id: ${event.pathParameters.id} was not found`)
    await que.destroy()
    return {
      statusCode: 200,
      body: JSON.stringify(que)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could destroy fetch the Question.'
    }
  }
}

module.exports.exam = async (event) => {
  try {
    const { Exam } = await connectToDatabase()

    const ques = await Exam.findAll({
      where: {exam_id: event.pathParameters.id},
      include: [{
        model: User,
        where: ["que_ch_id = post_year"],
        required: true
      }]
    })
    return {
      statusCode: 200,
      body: JSON.stringify(ques)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the exam ques.'
    }
  }
}
