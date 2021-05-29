import React, { Component, useState } from 'react'
import { LineChart, Line, YAxis, XAxis , CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function GraficoLine()  {
    const [temp, setTemp] = useState([]);
    const data2 = [
      {
        "name": "Page A",
        "uv": 3000,
        "pv": 2400,
        "amt": 2400
      },
      {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
      },
      {
        "name": "Page C",
        "uv": 2000,
        "pv": 1500,
        "amt": 2290
      },
      {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
      },
      {
        "name": "Page E",
        "uv": 1890,
        "pv": 3800,
        "amt": 2181
      },
      {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
      },
      {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
      },
    ]

    fetch("http://vendebelem.com/api/php-react/all-users.php")
    .then(response => {
      response.json().then((data) => {
        [data.dados].forEach(element => {
          setTemp(temp.push())
        });
      })
    })

    return (
      <div>
        <LineChart width={700} height={250} data={data2}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 6 }}/>
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" activeDot={{ r: 6 }}/>
        </LineChart>
      </div>
    )
}
