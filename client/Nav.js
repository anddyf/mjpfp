import React from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'
import {store, connect} from './Store.js'
// const Nav = connect(({ events, location: { pathname } })=> {
//     return (
//       <nav>
//         <Link to='/' className={ pathname === '/' ? 'active': ''}>Home</Link>
//         <Link to='/events' className={ pathname === '/events' ? 'active': ''}>Events ({ events.length })</Link>
//       </nav>
//     );
//   })
const Nav = connect(({ dates, location: { pathname }, match }) => {
    if(dates.length === 0){
        return <div className="preloader"></div>
     }
    let ourDate = dates.map(_calendar => _calendar.date)
    return(
        <ul>
    {
        ourDate.map((links, id) => { 
            if(`#/${id}` === location.hash && id === 11 ){
                return(
                <li key={id}>
                    <h2>MJPFP4R Calendar</h2>
                    <Link to={`/${id + 1}`}> Next↪</Link>
                </li>
                )
            }
            if(`#/${id}` === location.hash && id > 11 && id < 36 ){
                return(
                <li key={id}>
                    <Link to={`/${id - 1}`}>↩Prev </Link>
                    <h2>MJPFP4R Calendar</h2>
                    <Link to={`/${id + 1}`}> Next↪</Link>
                </li>
                )
            }
            if(`#/${id}` === location.hash && id === 36 ){
                return <li><Link></Link></li>
            }   
        })
    }
    </ul>
    )
})

export default Nav