import React from 'react'
import {store, connect, deleteTask} from './Store.js'
import { HashRouter, Link, Route } from 'react-router-dom'

const Page = connect(({ dates, tasks, location: { pathname }, match }) => {
    if(dates.length === 0){
       return <div className="subhead">The calendar is being loaded soon. Please wait...</div>
    }
    // if empty run loading
    const completedTask = (item) => {
       if(item.completed === true && item.tasks !== '' && item.tasks !== null){
         return  `✔ Done`
       }
       else if(item.completed === false && item.tasks !== '' && item.tasks !== null){
        return `✖ Still Working`
       }
        return ''
    }
    // if Tasks.completed is true send checkmark else send cross.
    let result = dates.map(links => {
            return [...links.date].map((date, id) =>{  
                return {
                    ...date,
                    task: links.tasks.filter( task => {
                            if(task.id === date.taskId){
                                return {...task}
                            }
                          })
                 }
            })
    })
    // add tasks into dates map
    return (
    <table>
        <tbody>
            {
                result.map( ( dates, idx ) => {
                    if(`${idx}` ===  match.params.page){   
                        return dates.map( (date, id) =>{
                            if(date.month !== 'None' && date.task[0].tasks === null || date.task[0].tasks === ""){
                                return(
                                    <tr key={date.id}>
                                        <td>{date.abbrev} {date.day}, {date.year}</td>
                                        <td className="task">{date.task[0].tasks}</td>
                                        <td className="red"><Link to={`/create/${idx}/${date.task[0].id}`}>Add</Link></td>
                                    </tr>
                                ) 
                            }
                            if(date.month !== 'None' && date.task[0].tasks !== null){
                                return(
                                    <tr key={date.id}>
                                        <td>{date.abbrev} {date.day}, {date.year}</td>
                                        <td className="task">{date.task[0].tasks.substring(0,25)}</td>
                                        <td className="task">{completedTask(date.task[0])}</td>
                                        <td className="red"><Link to={`/edit/${idx}/${date.task[0].id}`}>Edit</Link></td>
                                        <td className="red"><button  onClick={()=>deleteTask(date.task[0].id,{ id:parseInt(date.task[0].id), tasks:null, completed:false })}>Delete</button></td>
                                    </tr>
                                ) 
                            }
                        })
                    }
                })
            } 
        </tbody>
    </table>
    )
})

export default Page