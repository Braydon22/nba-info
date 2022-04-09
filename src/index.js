import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'
import { AppProvider } from './Context'

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root')
)