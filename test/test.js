const { conn, Calendar, Tasks, syncAndSeed, testSpec } = require('../server/db/db.js')
const runtime = require("regenerator-runtime/runtime")
// const request = require('supertest')
// const { app } = require('../server/app.js')

testSpec()

describe('Create Calendar and Task', () => {
  // example test using vanilla promise syntax (no async/await

  it('Task relationship with Calendar', async() => {  
    try{   
      await conn.sync({force:true})
      let taskThree = await Tasks.create({ id:4, tasks:null , completed: false })
      let result = await Calendar.create({ id:4, month:'January', day:11, year: 2019, abbrev:"Jan", taskId:taskThree.id })
      console.log(await result)
        expect(await result.dataValues.id).toEqual(4)
        expect(await result.dataValues.month).toBe('January')
        expect(await result.dataValues.year).toEqual(2019)
        expect(await result.dataValues.day).toEqual(11)
        expect(await result.dataValues.abbrev).toBe('Jan')
        expect(await result.dataValues.taskId).toEqual(4)
  
    }
    catch(e){ 
      throw(e)
    }

  })
})