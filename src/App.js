import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';



function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [info, setInfo] = useState([])
  const [options, setOptions] = useState([])
  const [output, setOutput] = useState(0)
  useEffect(() => {
    const AllCurrency = async () => {
      await axios.get('https://api.frankfurter.app/currencies')
        .then(res => setInfo(res.data))
        .catch(err => console.log(err))
    }
    AllCurrency()
  }, [])
  useEffect(() => {
    setOptions(Object.keys(info))
  }, [info])


  useEffect(() => {
    const convertcurr = async () => {
      await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        .then(res => setOutput(Object.values(res.data.rates)))
        .catch(err => console.log(err))
        
    }
    document.getElementById("convert").addEventListener('click', convertcurr)


    return () => {
      document.getElementById("convert").removeEventListener('click', convertcurr)
    }
  }, [amount, to, from])

  return (
    <div className='main'>
      <div className='currencyInfo'>
        <input type='text' placeholder='Enter Your Amount' onChange={e => setAmount(e.target.value)} />

        <select onChange={e => setFrom(e.target.value)} value={from}>
          {options.map(e => (
            <option value={e}>{e}</option>
          ))}
        </select>

        <select onChange={e => setTo(e.target.value)} value={to}>
          {options.map(e => (
            <option>{e}</option>
          ))}
        </select>
        <button id='convert'>Convert</button>
      </div>
      <div className='output'>
      <p>{`${amount} ${from} = ${output} ${to}`}</p>
      </div>
    </div>
  );
}

export default App;
