import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Networks from './pages/Networks'
import Server from './pages/Server'
import Implants from './pages/Implants'
import ImplantDetails from './pages/ImplantDetails'
import Stats from './pages/Stats'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/networks' element={<Networks />} />
                    <Route path='/server' element={<Server />} />
                    <Route path='/implants' element={<Implants />} />
                    <Route path='/implantdetails/:guid' element={<ImplantDetails />} />
                    <Route path='/stats' element={<Stats />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
