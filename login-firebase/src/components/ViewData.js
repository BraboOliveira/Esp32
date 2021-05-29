import React, { useEffect, useState } from 'react'
import firebase from 'firebase'

export default function ViewData() {
  // const getData = () => {
  //   let dados = {}
  //   var starCountRef = firebase.database().ref('config/sensores')
  //   starCountRef.on('value', function (snapshot) {
  //     // var valores = Object.values(snapshot.val());
  //     var valores = snapshot.val()

  //     dados = {
  //       umidade: valores.u,
  //       temperatura: valores.t,
  //       luminosidade: valores.l,
  //     }

  //     return dados
  //   })
  // }

  const [umidade, setUmidade] = useState(0)
  const [temperatura, setTemperatura] = useState(0)
  const [luminosidade, setLuminosidade] = useState(0)


  // console.log(dados)

  // console.log(dados)
  // useEffect(() => {
  //   setTimeout(() => {

  //   }, 5000)
  // }, [dados])

  useEffect(() => {
    var starCountRef = firebase.database().ref('config/sensores')
  starCountRef.on('value', function (snapshot) {
    var valores = snapshot.val()

    setUmidade(valores.u)
    setLuminosidade(valores.l)
    setTemperatura(valores.t)
  })
  }, [])

  return (
    <div>
      <h4>Umidade: {umidade}</h4>
      <h4>Temperatura: {temperatura}</h4>
      <h4>Luminosidade: {luminosidade}</h4>
    </div>
  )
}
