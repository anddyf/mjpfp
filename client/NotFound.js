import React from 'react'
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

const NotFound = () => {
    return (
    <div className="headline">
        The calendar cannot go further. If you want we can provide you with smiles :) 
        <Link to={`/35`}> Go Back</Link>
    </div>
    )
}

export default NotFound