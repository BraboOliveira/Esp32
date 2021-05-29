import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useAuth } from '../contexts/AuthContext'
import {
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap'

export default function NewTimer() {
  const options = {
    seg5: 5000,
    seg30: 30000,
    min1: 60000,
    min10: 600000,
    min30: 1800000,
    hora1: 3600000,
  }
  const { selFreq } = useAuth()
  let dbref = firebase.database().ref()
  const [error, setError] = useState('')
  const [inputDia, setInputDia] = useState(0)
  const [inputHora, setInputHora] = useState(5)
  const [inputMinuto, setInputMinuto] = useState(0)
 
  const [stateInputDia, setStateInputDia] = useState(false)
  const [stateInputHora, setStateInputHora] = useState(false)
  const [stateInputMinuto, setStateInputMinuto] = useState(false)

  const [countDownDate, setCount] = useState(0)
  

  function setarTime(){
    try {
      dbref.child('config').update({
          iniciar: 1,
          frequencia: options[`${selFreq}`]
        })
      
    } catch {
      setError("Erro ao iniciar")
      console.log(error)
    }

    setIniciar(true)
    setCount(dateReal())
    console.log(countDownDate)

    setStateInputDia(true)
    setStateInputHora(true)
    setStateInputMinuto(true)
  }

  // var countDownDate = new Date(`${meses[0]} 01, 2021 00:00:00`).getTime()

  function zeroFill(n) {
    return ('0' + n).slice(-2)
  }

  var diferenca = 0

  function calculateTimeLeft() {
    // var now = new Date().getTime()
    let timeleft = {}

    // var distance = countDownDate - now
    var distance = countDownDate
    diferenca = distance
    
    if (distance > 0) {
      timeleft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      }
    }
    return timeleft
  }

  const [timeleft, setTimeLeft] = useState(calculateTimeLeft())

  function dateReal() {
    let data = new Date()
    let now = data.getTime()
    let countDownDate = new Date(
      data.getFullYear(),
      data.getMonth(),
      inputDia + data.getDate(),
      inputHora + data.getHours(),
      inputMinuto + data.getMinutes(),
      data.getSeconds(),
      0,
      ).getTime() - now
      
      return countDownDate
  }

  const [iniciar, setIniciar] = useState(false)

  useEffect(() => {
    if(!iniciar){
      try {
        dbref.child('config').update({
            iniciar: 0
          })
      } catch {
        setError("Erro ao parar")
        console.log(error)
      }
    }
  })

  function parar(){
    try {
      dbref.child('config').update({
          iniciar: 0
        })
    } catch {
      setError("Erro ao parar")
      console.log(error)
    }
    setIniciar(false)
    setStateInputDia(false)
    setStateInputHora(false)
    setStateInputMinuto(false)
    setCount(0)
    setTimeLeft({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  }

  useEffect(function () {
    console.log(diferenca)
    if(diferenca > 0){
      var x = setInterval(function () {
        setCount(countDownDate - 1000)
        setTimeLeft(calculateTimeLeft())
      }, 1000)
    } else {
      try {
        dbref.child('config').update({
            iniciar: 0
          })
      } catch {
        setError("Erro ao parar")
        console.log(error)
      }
    }
    return () => clearInterval(x);
  }, [countDownDate])
  

  return (
    <>
      <Container>
        <Row>
          <Col>Dia</Col>
          <Col>Hora</Col>
          <Col>Minuto</Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setInputDia(Number(e.target.value))}
                min={0}
                type="number"
                placeholder="0"
                aria-label="Username"
                aria-describedby="basic-addon1"
                disabled={stateInputDia}
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setInputHora(Number(e.target.value))}
                min={0}
                type="number"
                placeholder={String(inputHora)}
                aria-label="Username"
                aria-describedby="basic-addon1"
                disabled={stateInputHora}
              />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setInputMinuto(Number(e.target.value))}
                min={0}
                type="number"
                placeholder="0"
                aria-label="Username"
                aria-describedby="basic-addon1"
                disabled={stateInputMinuto}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Button
        variant="primary"
        className="btn-block"
        onClick={() => {setarTime()}}
      >
        Iniciar
      </Button>

      <Button
        variant="danger"
        className="btn-block"
        onClick={() => {parar()}}
      >
        Parar
      </Button>

      <h2 className="text-center mt-2" >
        {timeleft.days || timeleft.hours || timeleft.minutes || timeleft.seconds
          ? `${timeleft.days}:${zeroFill(timeleft.hours)}:${zeroFill(
              timeleft.minutes,
            )}:${zeroFill(timeleft.seconds)}`
          : 'O tempo acabou!'}
      </h2>
    </>
  )
}
