import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import React, { Component } from 'react'

export default class TestMysql extends Component {
  render() {
    // Create a connection to the database
    const connection = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "dorneli"
    });

    // open the MySQL connection
    connection.connect(error => {
      if (error) throw error;

      // query data from MySQL
      connection.query("SELECT * FROM dados", function (error, data, fields) {
        if (error) throw error;

        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);

        // TODO: export to CSV file
      });
    });


    return (
      <>
        <h1>olá</h1>
      </>
    )
  }
}