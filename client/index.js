import React from 'react'
import ReactDOM from 'react-dom'
import Nav from './Nav'
import Create from './Create'
import Edit from './Edit'
import NotFound from './NotFound.js'
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { store, fetchDates } from "./Store.js"
import Page from "./Dates.js"


class App extends React.Component{
    componentDidMount(){   
        setTimeout(()=>{
            fetchDates()
        }, 5000)
    }
    render(){   
        return (
            <HashRouter>
                <Route component={ Nav } />               
                <Route path={"/:page"} component={ Page } />
                <Route path={"/36"} component={ NotFound } />
                <Route path={"/create/:page/:id"} component={Create}/>
                <Route path={"/edit/:page/:id"} component={Edit}/>
                <Redirect to={"/11"}/> 
            </HashRouter>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app') )