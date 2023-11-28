import React from 'react'
import Home from '../home/Home'
import About from '../about/About'
import Skills from '../skills/Skills'
import Qualifications from '../qualifications/Qualifications'
import Connect from '../connect/Connect'

const FrontPage = () => {
    return (
        <div>
            <Home />
            <About />
            <Skills />
            <Qualifications />
            <Connect />
        </div>
    )
}

export default FrontPage