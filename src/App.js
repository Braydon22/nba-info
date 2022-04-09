import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from "./Components/Pages/Home"
import Players from "./Components/Pages/Players"
import Teams from "./Components/Pages/Teams"
import Games from "./Components/Pages/Games"
import Error from "./Components/Pages/Error"
import SinglePlayer from "./Components/Pages/SinglePlayer"
import SingleTeam from "./Components/Pages/SingleTeam"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeftLong, faBasketball, faUser, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowLeftLong, faBasketball, faUser, faBars)

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/players/:playerId" element={<SinglePlayer />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/:teamId" element={<SingleTeam />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}