import Header from '../../Header/Header'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';


function TeamInfo(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>

                <div > <h1>팀정보</h1> </div>

            </div>
        </div>
    )
}

export default withRouter(TeamInfo)