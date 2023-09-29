import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import JobDetailPage from './pages/JobDetailPage'
import LoginPage from './pages/LoginPage'
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/jobDetail/:id" element={<ProtectedRoute><JobDetailPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App