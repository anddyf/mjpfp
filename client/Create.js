import React from 'react'
import {store, connect, deleteTask, fetchPost} from './Store.js'
import { HashRouter, Link, Route } from 'react-router-dom'
const axios = require('axios');
const API = 'http://localhost:3000' 
// This section will send the input value to the fetchPost function. The function will send the id and object
// through an axios post which will update the id in the api. And the function will also update the store state. 
const Create = connect(({ dates, location: { pathname }, match }) => {
    return (
        <form >
            <label className="headlineTask"> Create Task</label>
            <label>
            Task
                <input name="task" type={'text'} placeholder={'task'}></input>
            </label>
            <label>
            Completed
                <select name="completed">
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>
            </label>
            <button className="submit" type="submit" onClick ={ async(ev) => {
                ev.preventDefault()
                if (document.getElementsByName('task')[0].value === ''){
                    document.getElementsByName('task')[0].value = null
                }
                else if (document.getElementsByName('completed')[0].value === true && document.getElementsByName('task')[0].value === '') {
                    document.getElementsByName('completed')[0].value = false
                }
                let task = document.getElementsByName('task')[0].value
                let complete = document.getElementsByName('completed')[0].value
                if (complete === 'true'){
                    complete = true
                }
                else {
                    complete = false 
                }
                let item = { id: parseInt(match.params.id), tasks: task, completed: complete }
                fetchPost(match.params.id, item)
                window.location.replace(`#/${match.params.page}`)
            }}>
            Submit
            </button>
        <Link className="sub" to={`/${match.params.page}`}>Go Back</Link>
        </form>
    )
})

export default Create