import React , {useCallback, useEffect, useState} from 'react';
import { View , Text, Button} from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
 //import { Container } from './styles';

const Home = () => {
    const [valor, setValor] = useState([])
    const [dados, setDados] = useState([])
    const [tempo, setTempo] = useState(2000)
    // useEffect(() => {
    //     async function loadStorageData(){
    //         console.log("uma vez aqui")
    //         var credentials  = {
    //             apiKey: "AIzaSyDdwitxShysQ4iFdiLD4hqobNSBNTbH1sE",
    //             authDomain: "esp32-cc1a8.firebaseapp.com",
    //             databaseURL: "https://esp32-cc1a8.firebaseio.com",
    //             projectId: "esp32-cc1a8",
    //             storageBucket: "esp32-cc1a8.appspot.com",
    //             messagingSenderId: "579204333410",
    //             appId: "1:579204333410:web:cdfa3e6d9d84d628f4763b"
    //         };
    //         const config = {
    //             name: 'SECONDARY_APP',
    //           };
    //             // Initialize Firebase
    //             const secondaryApp = await firebase.initalizeApp(credentials, config);
    //         // firebase.initalizeApp(credentials, config);
    //         }

    //     loadStorageData()
    // }, [])
    // To Await 5 seconds to insert a new user
    function enviaDado ()  {
        firebase.database().ref('sensores').set(
            {
                luminosidade: 0,
                umidade: 0,
                temperatura: 0,
                nh3:0,
            }
        ).then(() => {
            console.log('INSERIDO !');
        }).catch((error) => {
            console.log(error);
        });
    }

//Ouve o banco de dados
useEffect(() => {
    const interval = setInterval( ()=>{
        firebase.database().ref('sensores/')
        .on('value', snapshot =>{
            // console.log(snapshot.val())
            var sensorData =snapshot.val()
            setValor(sensorData)     
             });
    },tempo)
    return () => clearInterval(interval);
},[]);

    useEffect(() => {
        console.log('teste')
        let newDados = {
        luminosidade: valor.luminosidade,
        umidade:valor.umidade,
        temperatura:valor.temperatura,
        nh3: valor.nh3,
        }
        if(valor.length==0){
            console.log('Vazio')
        }
        else{
        let dadosA = Array.from(dados);
        dadosA.push(newDados) 
        console.log('atualiza')
        setDados(dadosA)
    }
    },[valor['luminosidade']]);

    // setTimeout(()=>{
    //     database()
    //     .ref('/sensores')
    //     .on('value', snapshot => {
    //     // console.log('Dados do Usuário: ', snapshot.val());
    //     setValor(snapshot.val());
    //     });
        
    //     let newDados ={
    //         luminosidade: valor.luminosidade,
    //         umidade:valor.umidade,
    //         temperatura:valor.temperatura,
    //         nh3: valor.nh3,
    //         }
    //         let dadosA = dados
    //         dadosA.push(newDados)
    //         setDados(dadosA)
    //         console.log(dados)
    // },[20000])

    // useEffect(() => {
    //     console.log('mudou')
    //   }, [valor]); // Apenas re-execute o efeito quando o count mudar

     inserirDados = ()=>{
        // let newDados ={
        // luminosidade: valor.luminosidade,
        // umidade:valor.umidade,
        // temperatura:valor.temperatura,
        // nh3: valor.nh3,
        // }
        // let dadosA = dados
        // dadosA.push(newDados)

        console.log(dados.length)
        console.log(dados)
    }
    // const data = [
    //     {luminosidade: valor.luminosidade},
    //     {umidade:valor.umidade},
    //     {temperatura:},
    //     {nh3},
    // ]

  return (
  <View>
      <Text>Luminopsidade: {valor.luminosidade}</Text>
      <Text>Temperatura: {valor.temperatura}</Text>
      <Text>umidade: {valor.umidade}</Text>
      <Text>Nh3: {valor.nh3}</Text>
      <Button
        title="Press me"
        onPress={enviaDado}
      />
        <Button
        title="dados"
        onPress={inserirDados}
      />
  </View>
  )
}

export default Home;

