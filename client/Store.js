import React from 'react'
import { createStore, combineReducers } from 'redux';
import { HashRouter, Link, Route } from 'react-router-dom'
const axios = require('axios');

const reducer = combineReducers({
  dates: (state = [], action)=> {
    if (action.type === 'SET_DATE'){ 
      state = [...state, { date: action.date, tasks: action.tasks} ]
    }
    if (action.type === 'CREATE_TASK'){
      state = state.map( date => {
        return {
          date: date.date.map( date => date),
          tasks: date.tasks.map(_task => {
            if (_task.id === action.item.id){
              _task.tasks = action.item.tasks
              _task.completed = action.item.completed
            }
            return _task
          })
        }
      })
    }
    if (action.type === 'UPDATE_TASK'){
      state = state.map( date => {
        return {
          date: date.date.map( date => date),
          tasks: date.tasks.map(_task => {
            if (_task.id ===  action.item.id){
              _task.tasks = action.item.tasks
              _task.completed = action.item.completed
            }
            return _task
          })
        }
      })
    }
    if(action.type === 'DELETE_TASK'){
      state = state.map( date => {
        return {
          date: date.date.map( date => date),
          tasks: date.tasks.map(_task => {
            if(_task.id === action.item.id){
              _task.tasks = null
              _task.completed = false
            }
          return _task
          })
        }
      })
    }
    return state;
  }
});

const API = 'http://localhost:3000'
const store = createStore(reducer);

let fetchDates = async()=> {
    for(let i = 0; i <= 36;i++){
        store.dispatch({ type: 'SET_DATE', date: (await axios.get(`${API}/api/calendar/${i}`)).data, tasks: (await axios.get(`${API}/api/tasks/${i}`)).data})
    }
}
let fetchPost = async(match ,item)=> {
    await axios.post(`${API}/api/tasks/task/${match}`, item)
    store.dispatch({ type: 'CREATE_TASK', item });
}
let fetchPut = async(match ,item)=> {
    await axios.put(`${API}/api/tasks/task/${match}`, item)
    store.dispatch({ type: 'UPDATE_TASK', item });
}
const deleteTask = async(match ,item)=> {
    await axios.delete(`${API}/api/tasks/task/${match}`)
    store.dispatch({ type: 'DELETE_TASK', item });
};

const connect = (Component) => {
  class Connected extends React.Component{
    constructor(){
    super();
      this.state = store.getState();
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
    componentDidMount(){
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    render(){
      return (
        <Component {...this.state } {...this.props }/>
      );
    }
  }
  return Connected;
}

export {
    store,
    fetchDates,
    deleteTask,
    fetchPost,
    fetchPut,
    connect
}