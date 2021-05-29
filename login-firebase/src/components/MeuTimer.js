import React, { useState, useEffect } from 'react'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
// import { useAuth } from "../contexts/AuthContext"
import firebase from "firebase"

export default function Timer() {
  // const { sendEnd } = useAuth()
  const [error, setError] = useState("")
  const [hora, setHora] = useState(0)
  const [minuto, setMinuto] = useState(0)
  const [dia, setDia] = useState(0)

  var diferenca = 0
  function calculateTimeLeft() {
    let date = new Date()
    // let year = new Date().getFullYear()
    let year = date.getFullYear()
    setDia(date.getDay())
    const difference = +new Date(`${year}-12-9`) - +new Date()
    // const difference =
    //   +new Date(`${year}-12-${dia}T${hora}:${minuto}`) - +new Date()
    diferenca = difference
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        // minutes: Math.floor((difference / 1000 / 60) % 60),
        // seconds: Math.floor((difference / 1000) % 60),
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  // const [year] = useState(new Date().getFullYear())

  useEffect(() => {
    var timer = setTimeout(() => {
      if(diferenca > 0){
        setTimeLeft(calculateTimeLeft())
        console.log(diferenca)
      } else {
        handleSend()
        clearTimeout(timer)
      }
    }, 1000);
  //  setTimeout(() => {
  //   setTimeLeft(calculateTimeLeft())
  //   }, 1000)
  }, [diferenca, calculateTimeLeft, handleSend])

 function handleSend() {
    setError("")

    try {
      firebase.database().ref().child('config').update({
          iniciar: 0
        })
      
    } catch {
      setError("Failed to log out")
      console.log(error)
    }
  }

  let zerosTimes = (d, h, m, s) => {
    var dz = String(d).length === 1 ? '0' + String(d) : d
    var hz = String(h).length === 1 ? '0' + String(h) : h
    var mz = String(m).length === 1 ? '0' + String(m) : m
    var sz = String(s).length === 1 ? '0' + String(s) : s
    return (`Termina em: ${dz}:${hz}:${mz}:${sz}`)
  }

  return (
    <div>
      <h2>
        {diferenca > 0 ? zerosTimes(timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds) : (
          <span>O tempo acabou!!</span>
        )}
      </h2>
      <Button variant="outline-success" >
        Iniciar contagem regressiva
      </Button>
      <Form className="d-flex flex-row justify-content-center" >
      <InputGroup className="px-2 mb-3 w-25">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">D</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="00"
          aria-label="Number"
          aria-describedby="basic-addon1"
          onChange={e => {setDia(e.target.value)}}
          // disabled={true}
        />
      </InputGroup>

      <InputGroup className="px-2 mb-3 w-25 ">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">H</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="00"
          aria-label="Number"
          aria-describedby="basic-addon1"
          onChange={e => {setHora(e.target.value)}}
          // disabled={true}
        />
      </InputGroup>

      <InputGroup className="mb-3 w-25 ">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">M</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="00"
          aria-label="Number"
          aria-describedby="basic-addon1"
          onChange={e => {setMinuto(e.target.value)}}
          // disabled={true}
        />
      </InputGroup>
      
      </Form>
    </div>
  )
}
