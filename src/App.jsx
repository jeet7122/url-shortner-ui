import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {getApps} from "./utils/helper.js";

const App = () => {
    const CurrentApp = getApps();
    return (

        <BrowserRouter>
            <CurrentApp/>
        </BrowserRouter>
    )
}
export default App
