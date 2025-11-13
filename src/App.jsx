import Container from 'react-bootstrap/Container'
import NavigationBar from './components/NavigationBar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Game from './pages/Game.jsx'
import './index.css'

function App() {
  return (
    <>
    <NavigationBar />
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game/:consoleName' element={<Game />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
    </>
  )
}

export default App
