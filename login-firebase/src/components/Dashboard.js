import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import NewTimer2 from './NewTimer2'
import Frequencia from './Frequencia'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Logout falou!')
    }
  }

  return (
    <>
        <Card className='p-2 mt-3' >
            <div>
              <h2 className="text-center mb-4">Perfil</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-secondary w-100 mt-3">
                Alterar perfil
              </Link>
              <Button className="text-center" variant="link" onClick={handleLogout}>
                Sair
              </Button>
            </div>
        </Card>
      <div className='d-flex justify-content-evenly mt-1' >
        <Card className="d-inline p-2">        
          <div className="w-100 text-center">
            <NewTimer2 />
            <Frequencia />
          </div>
        </Card>
      </div>
    </>
  )
}
