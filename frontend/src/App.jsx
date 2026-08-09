import { useState } from 'react'
import './App.css'
import Login from './Login'
import Register from './Register'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Waste Management System</h1>
      <div style={{ display: 'flex', gap: '50px' }}>
        <Register />
        <Login />
      </div>
    </div>
  )
}

export default App