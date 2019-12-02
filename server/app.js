const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const runtime = require("regenerator-runtime/runtime")
const app = express()
const PORT = 3000
const { Calendar, Tasks, syncAndSeed } = require("./db/db.js")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const paginate = (pageNum, pageSize) => {
    return { limit: pageSize, offset: pageNum * pageSize };
  };

app.use(express.static(path.join(__dirname, '../public'))) 

app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/api/calendar', async(req, res, next)=> {
  res.status(200).send(await Calendar.findAll({order: ['id']}))
})

app.get('/api/calendar/:page', async(req, res, next) => {
  try {
  const resultsPerPage = 31;
  // pageNum is zero indexed
  let pageNum = req.params.page;
  if (pageNum === undefined) {
    pageNum = 0;
  } else if (isNaN(pageNum)) {
    return res.status(400).send({ error: 'Invalid page number' });
  }

  const { limit, offset } = paginate(pageNum, resultsPerPage);
    res.status(200).send( await Calendar.findAll({limit, offset, order: ['id']}))
  }
  catch (e){
      next(e)
  }
  })

  app.get('/api/tasks/:page', async(req,res,next) => {
    try {
      const resultsPerPage = 31;
      let pageNum = req.params.page;
      if (pageNum === undefined) {
        pageNum = 0;
      } else if (isNaN(pageNum)) {
        return res.status(400).send({ error: 'Invalid page number' });
      }
    
      const { limit, offset } = paginate(pageNum, resultsPerPage);
        res.status(200).send( await Tasks.findAll({limit, offset, order: ['id']}))
      }
      catch (e){
          next(e)
      }
  })

app.get('/api/calendar/date/:id', async(req, res, next)=> {
  let identity = req.params.id;
  res.send(await Calendar.findAll({
    where: {id: identity}}
    ))
})

app.get('/api/tasks/task/:id', async(req, res, next)=> {
  let identity = req.params.id;
  res.send(await Tasks.findAll({
    where: {id: identity}
  }))
})

app.post('/api/tasks/task/:id', async(req, res, next)=> {
  try{
  let addtask = await Tasks.update({...req.body}, { where: {id:req.params.id}})
  if(addtask){
    res.status(200).send(await Tasks.findAll({where: {id: req.params.id}}));
  }
  else {
    res.status(404).send('item error');
  }
  }
  catch(e){
    res.status(400).send('item not found');
    next(e)
  }
})

app.put('/api/tasks/task/:id', async(req, res, next)=> {
  try{
  let addtask = await Tasks.update({...req.body}, { where: {id:req.params.id}})
  if(addtask){
    res.status(200).send(await Tasks.findAll({where: {id: req.params.id}}));
  }
  else {
    res.status(404).send('item error');
  }
  }
  catch(e){
    res.status(400).send('item not found');
    next(e)
  }
})

app.delete('/api/tasks/task/:id', async(req, res, next)=> {
  try{
  await Tasks.destroy({ where: {id:req.params.id}})
  await Tasks.create({id:req.params.id, tasks:null, completed:false})
    res.status(200).send();
  } 
  catch(e){
    res.status(400).send('item not found');
    next(e)
  }
})
 syncAndSeed({force:true}).then(()=>{
     app.listen(PORT, ()=>{
          console.log('success')
      })
  })