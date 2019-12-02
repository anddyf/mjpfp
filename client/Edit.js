import React from 'react'
import {store, connect, deleteTask, fetchPut} from './Store.js'
import { HashRouter, Link, Route } from 'react-router-dom'
const axios = require('axios');
const API = 'http://localhost:3000'
// This will send the input value into the fetchPut function. 
//The value will be sent to the axios put method which will update the id. And the store state will be updated
const Edit = connect(({ dates, location: { pathname }, match })=>{
    if(dates.length === 0){
        return <div>Loading...</div>
    }
    let arrTask = [] 
    let task = dates.map( date =>{
        return date.tasks.forEach( _task =>{
            if(`${_task.id}` === match.params.id){
            arrTask.push(_task)
            }
        })
    })
    let sub = 'submit'
    let completefunc = (item) => {
        if (item){
            return `Done`
        }
        if (!item){
            return `Not Done`
        }
    }
    return (
        <form>
            <label className="headlineTask">Edit Task</label>
            <label>
            Task Right Now : {arrTask[0].tasks}
                <input name="task" type={'text'} placeholder={`${arrTask[0].tasks}`}></input>
            </label>
            <label>
                Completed Status: {completefunc(arrTask[0].completed)}
                <select name="completed">
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>
            </label>
            <button className="submit" type="submit" onClick ={ async(ev) => {
                ev.preventDefault()
                if(document.getElementsByName('task')[0].value === ''){
                    document.getElementsByName('task')[0].value = arrTask[0].tasks
                }
                let task = document.getElementsByName('task')[0].value
                let complete = document.getElementsByName('completed')[0].value
                if (complete==='true'){
                    complete = true
                }
                else {
                    complete = false 
                }
                let item = { id: parseInt(match.params.id), tasks: task, completed: complete }
                fetchPut(match.params.id, item)
                window.location.replace(`#/${match.params.page}`)
                }}>
            Submit
            </button>
            <Link className="sub" to={`/${match.params.page}`}>Go Back</Link>
        </form>
    )
})

export default Edit