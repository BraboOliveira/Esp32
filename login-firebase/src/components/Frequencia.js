import React, { useEffect, useState } from 'react'
import { Card, Button } from "react-bootstrap"
// import firebase from 'firebase'
import { useAuth } from '../contexts/AuthContext'

export default function Frequencia() {
  // let dbref = firebase.database().ref()
  // const [error, setError] = useState('')
  const { selFreq, setFreq } = useAuth()
  
  const options = {
    seg5: 5000,
    seg30: 30000,
    min1: 60000,
    min10: 600000,
    min30: 1800000,
    hora1: 3600000,
  }

  const handleFrequencia = (e) => {
    setFreq(e.target.value)
  }

  useEffect(() => {
    console.log(options[`${selFreq}`])
  }, [selFreq])

  // function handleSend() {
  //   setError("")

  //   try {
  //     dbref.child('config').update({
  //         iniciar: 1,
  //         frequencia: options[`${selFreq}`]
  //       })
      
  //   } catch {
  //     setError("Erro ao iniciar")
  //     console.log(error)
  //   }
  // }

  // const handleStop = () => {
  //   setError("")

  //   try {
  //     dbref.child('config').update({
  //         iniciar: 0
  //       })
  //   } catch {
  //     setError("Erro ao parar")
  //     console.log(error)
  //   }
  // }

  return (
    <>
      {/* <Button onClick={handleSend} className="w-100 btn-block" type="button" >
        Enviar configuração
      </Button>
      <Button onClick={handleStop} className="w-100 btn-danger btn-block" type="button" >
        Parar
      </Button> */}

      <Card className="mt-2 pb-2" >
        <p>Frequência</p>
        <select value={selFreq} onChange={handleFrequencia} >
          <option value='seg5' >5 segundos</option>
          <option value='seg30' >30 segundos</option>
          <option value='min1'  >1 minuto</option>
          <option value='min10' >10 minutos</option>
          <option value='min30' >30 minutos</option>
          <option value='hora1' >1 hora</option>
        </select>
      </Card>
      {/* <p>Frequência: {selFreq}</p> */}
    </>
  )
}
