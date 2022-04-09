import React from 'react';
import { Link } from 'react-router-dom'

import background from '../../Image/error-background.png'

function Error(props) {
    return (
        <div className='error-container'>
            <h1>Error, Page Doesn't Exist</h1>
            <Link to='/'>
                <button className="btn large-btn"> Back to Home </button>
            </Link>
            <img className='error-background' src={background} alt="background image" />
        </div>
    );
}


export default Error
