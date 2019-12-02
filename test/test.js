const { conn, Calendar, Tasks } = require('../server/db/db.js')
const runtime = require("regenerator-runtime/runtime")
// const request = require('supertest')
// const { app } = require('../server/app.js')

describe('Create Calendar and Task', () => {
  // example test using vanilla promise syntax (no async/await)
  it('Add Calander', async() => {
    try{
      await conn.sync({force:true})
        let taskOne = await Tasks.create({ id:1, tasks:null , completed: false })
        let result = await Calendar.create({ id:1, month:'February', day:2, year: 2019, abbrev:"Feb", taskId:taskOne.id })
        expect(await result.dataValues.id).toBe(1)
        expect(await result.dataValues.month).toBe('February')
        expect(await result.dataValues.year).toBe(2019)
        expect(await result.dataValues.abbrev).toBe('Feb')
      await conn.close({force:true})
    }
    catch(e){
      console.log(e)
    }  
  })
  it('Task relationship with Calendar', async() => {
    try{
      await conn.sync({force:true})
        let taskThree = await Tasks.create({ id:4, tasks:null , completed: false })
        let result = await Calendar.create({ id:4, month:'January', day:15, year: 2019, abbrev:"Jan", taskId:taskThree.id })
        expect(await result.dataValues.id).toBe(4)
        expect(await result.dataValues.month).toBe('January')
        expect(await result.dataValues.year).toBe(2019)
        expect(await result.dataValues.day).toBe(15)
        expect(await result.dataValues.abbrev).toBe('Jan')
        expect(await result.dataValues.taskId).toBe(4)
      await conn.close({force:true})
    }
    catch(e){
      console.log(e)
    }
  })
})