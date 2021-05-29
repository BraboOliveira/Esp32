import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'
import api from '../api'

export default function Grafico() {
  const [mediat, setMediat] = useState(0)
  const [mediau, setMediau] = useState(0)
  const [medial, setMedial] = useState(0)
  const [median, setMedian] = useState(0)

  const [maiort, setMaiort] = useState(0)
  const [maioru, setMaioru] = useState(0)
  const [maiorl, setMaiorl] = useState(0)
  const [maiorn, setMaiorn] = useState(0)
  
  const [menort, setMenort] = useState(0)
  const [menoru, setMenoru] = useState(0)
  const [menorl, setMenorl] = useState(0)
  const [menorn, setMenorn] = useState(0)

  const [temp, setTemp] = useState([
    ['x', 'Carregando...'],
    [0, 0],
  ])

  const [umi, setUmi] = useState([
    ['x', 'Carregando...'],
    [0, 0],
  ])

  const [lumi, setLumi] = useState([
    ['x', 'Carregando...'],
    [0, 0],
  ])

  const [nh3, setNh3] = useState([
    ['x', 'Carregando...'],
    [0, 0],
  ])

  useEffect(() => {
    // effect
    // return () => {
    //   cleanup
    // }
    let oi = setTimeout(() => {
      api
        .post("php-react/all-users.php")
        .then((response) => {
          if (response.status === 200) {
            // let test = [['a', 'e'], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10]]
            let t = [['a', 'Temperatura (ºC)']]
            let u = [['a', 'Umidade (%)']]
            let l = [['a', 'Luminosidade']]
            let n = [['a', 'Nível de amônia (ppm)']]
            response.data.dados.map(function(e) {
                t.push([+e.id, +e.temp]);
                u.push([+e.id, +e.umi]);
                l.push([+e.id, +e.lumi]);
                n.push([+e.id, +e.nh3]);
                return 0;
            })

            let soma = (array) => {
              let total = array.slice(1, array.lenght).reduce((total, n) => {
                return total + n[1]
              }, 0)
              
              return total
            }

            let total_elementos = response.data.dados.length
            // console.log(typeof response.data.dados.length)
            let media = array => +(soma(array) / total_elementos).toFixed(2)
            
            let maior = a => {
              let arrayMaior = []
              a.slice(1, a.lenght).forEach(element => {
                arrayMaior.push(element[1])
              });
              return Math.max.apply(null, arrayMaior)
            }

            let menor = a => {
              let arrayMaior = []
              a.slice(1, a.lenght).forEach(element => {
                arrayMaior.push(element[1])
              });
              return Math.min.apply(null, arrayMaior)
            }

            setMenorl(menor(l))
            setMenorn(menor(n))
            setMenort(menor(t))
            setMenoru(menor(u))

            setMaiort(maior(t))
            setMaiorl(maior(l))
            setMaiorn(maior(n))
            setMaioru(maior(u))
            
            setMediat(media(t))
            setMediau(media(u))
            setMedial(media(l))
            setMedian(media(n))

            // console.log(t)

            // setMediat(response.data.dados.length)
            setTemp(t)
            setUmi(u)
            setLumi(l)
            setNh3(n)
          }
        })
        .catch((error) => {
          console.log("Ocorreu um erro ao buscar os items");
        });
    }, 5000);

    return () => clearTimeout(oi)
  }, [temp])

  let graficotemp = <Chart
  widthMax = {'400px'}
  height = {'400px'}
  chartType = "LineChart"
  loader = {<div> Carregando gráfico... </div>}
  data = {temp}
  options = {
    {
      chartArea: {
        width: '90%',
        height: '90%',
      },
      colors: ['#fd7e14', '#6f42c1'],
      legend: {position: 'top'},
      // title: 'Temperatura (ºC)',
      // hAxis: { title: 'Time' },
      // vAxis: { title: 'Popularity' },
    }
  }
  rootProps = {{'data-testid': '1'}}
  /> 

  let graficoumi = <Chart
  widthMax = {'400px'}
  height = {'400px'}
  chartType = "LineChart"
  loader = {<div> Carregando gráfico... </div>}
    data = {umi}
    options = {
      {
        chartArea: {
          width: '90%',
          height: '90%',
        },
        colors: ['#dc3545', '#198754'],
        legend: {position: 'top'},
        // title: 'Temperatura (ºC)',
        // hAxis: {
        //   title: 'Time',
        // },
        // vAxis: {
        //   title: 'Popularity',
        // },
      }
    }
    rootProps = {{'data-testid': '1'}}
    />

    let graficolumi = <Chart
    // width = {'900px'}
    height = {'400px'}
    chartType = "LineChart"
    loader = {<div> Carregando gráfico... </div>}
      data = {lumi}
      options = {
        {
          chartArea: {
            width: '90%',
            height: '90%',
          },
          colors: ['#20c997', '#d63384'],
          legend: {position: 'top'},
          // title: 'Temperatura (ºC)',
          // hAxis: {
          //   title: 'Time',
          // },
          // vAxis: {
          //   title: 'Popularity',
          // },
        }
      }
      rootProps = {{'data-testid': '1'}}
      />

    let graficonh3 = <Chart
    // width = {'900px'}
    height = {'400px'}
    chartType = "LineChart"
    loader = {<div> Carregando gráfico... </div>}
      data = {nh3}
      options = {
        {
          chartArea: {
            width: '90%',
            height: '90%',
          },
          colors: ['#3D00CC', '#8000FF'],
          legend: {position: 'top'},
          // title: 'Temperatura (ºC)',
          // hAxis: {
          //   title: false,
          // },
          // vAxis: {
          //   title: false,
          // },
        }
      }
      rootProps = {{'data-testid': '1'}}
      />

  return ( 
    <center>
      <div className="card">
        <h5 className="mt-3" >Médias</h5>
        <div className="card-body" >
          <div className="row">
            <div className="col" style={{ color: '#fd7e14' }} >
              <p>Temperatura</p>
              <h4>{mediat}</h4>
            </div>
            <div className="col"style={{ color: '#dc3545' }} >
              <p>Umidade</p>
              <h4>{mediau}</h4>
            </div>
            <div className="col" style={{ color: '#20c997' }} >
              <p>Luminosidade</p>
              <h4>{medial}</h4>
            </div>
            <div className="col" style={{ color: '#3D00CC' }} >
              <p>Amônia</p>
              <h4>{median}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "10px" }} >
        <h5 className="mt-3" >Máximos e mínimos</h5>
        <div className="card-body" >
          <div className="row">
            <div className="col" style={{ color: '#fd7e14' }} >
              <p>Temperatura</p>
              <h4>{maiort}</h4>
              <h4>{menort}</h4>
            </div>
            <div className="col"style={{ color: '#dc3545' }} >
              <p>Umidade</p>
              <h4>{maioru}</h4>
              <h4>{menoru}</h4>
            </div>
            <div className="col" style={{ color: '#20c997' }} >
              <p>Luminosidade</p>
              <h4>{maiorl}</h4>
              <h4>{menorl}</h4>
            </div>
            <div className="col" style={{ color: '#3D00CC' }} >
              <p>Amônia</p>
              <h4>{maiorn}</h4>
              <h4>{menorn}</h4>
            </div>
          </div>
        </div>
      </div> 

      <div className="container">
        <div className="row">
          <div className="col mt-4 mb-3 ">
            {graficotemp}
          </div>
          <div className="col mt-4 mb-3 ">
            {graficoumi}
          </div>
        </div>
        <div className="row">
          <div className="col mt-4 mb-3 ">
            {graficolumi}
          </div>
          <div className="col mt-4 mb-3 ">
            {graficonh3}
          </div>
        </div>
      </div>     
    </center>
    )
  }