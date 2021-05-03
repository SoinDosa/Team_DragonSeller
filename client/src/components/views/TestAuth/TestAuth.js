import React from 'react'
import { withRouter } from 'react-router-dom';


function TestAuth() {

    return (

        <div>
            <h1>You are admin</h1>
        </div>
    )
}

export default withRouter(TestAuth)