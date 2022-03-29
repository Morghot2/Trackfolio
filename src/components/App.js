import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";
import "../style.css";
import search from "../search.png";

const App = () => {
  let [total, setTotal] = useState(0);
  // const [coins, setCoins] = useState([]);
  const refs = useRef([]);
  const [coin, setCoin] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };
  // const calculateTotal = () => {
  //   const results = refs.current.filter(element => {
  //     return element !== null;
  //   });
  //   let sum = 0;
  //   for (let i = 0; i < refs.current.length; i++) {
  //     refs.current[i].innerHTML !== null ? sum += parseInt(refs.current[i].innerHTML) : console.log('dupa')
  //   }
  //   setTotal(sum);
  // };

  const calculateTotal = () => {
    const results = refs.current.filter(element => {
      return element !== null;
    });
    let sum = 0;
    for (let i = 0; i < results.length; i++) {
      sum += parseInt(results[i].innerHTML) 
    }
    setTotal(sum);
  };
  // calculateTotal()
  useEffect(() => {})





  const fetchCrypto = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    try {
      setLoading(true);
      if (coinsList.some((element) => element.id === coin)) {
        return;
      } else {
        const result = await axios.get(url);
        setCoinsList((coinList) => [...coinList, result.data]);
      }
    } catch (e) {
      alert("Provide valid coin name");
    } finally {
      setLoading(false);
    }
  };
  const removeCrypto = (coin) => {
    const coinPosition = coinsList.indexOf(coin);
    setCoins(0)
    
    // refs.current.splice(coinsList.indexOf(coin), 1, 'dupa')
    setCoinsList(
      coinsList.filter((element) => coinPosition !== coinsList.indexOf(element))
    );
  };
  // const onValueEnter = (event, coinIndex) => {
  //   event.preventDefault();
  //   // coins.splice(coinsList.indexOf(coin), 1, event.target.value);
  //   coins.push(event.target.value)

  //   // setCoins(event.target.value)
    
  //   // calculateTotal()
  //   // setCoins(event.target.value)
    
  // };

  return (
    <div className="coin-app">
      <div className="search-bar">
        <div className="form-wrapper">
          <h1 className="coin-text">Search for currency</h1>
          <div className="form">
            <input
              className="search-field"
              type="text"
              placeholder="Search..."
              onChange={onInputChange}
              value={coin}
            />
            <button
              className="search-button"
              id="fetchButton"
              type="submit"
              onClick={() => (coin !== "" ? fetchCrypto() : null)}
              disabled={loading}
            >
              <img src={search} alt="search" className="button-img"></img>
            </button>
          </div>
        </div>
      </div>
      <div className="coin-title-container">
        <div className="segment">Name</div>
        <div className="price-segment">Price(USD)</div>
        <div className="input-segment">Amount</div>
        <div className="value-segment">Asset Value(USD)</div>
        <div className="segment-delete-button"></div>
      </div>
      <DisplayCoin
        coinsList={coinsList}
        removeCrypto={removeCrypto}
        refs={refs}
        calculateTotal={calculateTotal}
        coins={coins}
        setCoins={setCoins}
        // total={total}
        // onValueEnter={onValueEnter}
        // coins={coins}
      />
      
      <button onClick={calculateTotal}>Total</button>
      <div>Your total assets value: ${total}</div>
    </div>
  );
};

export default App;
