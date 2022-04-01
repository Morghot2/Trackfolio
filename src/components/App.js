import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";
import "../style.css";
import search from "../search.png";

const App = () => {
  let [total, setTotal] = useState(0);

  const refs = useRef([]);
  const [coin, setCoin] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validNumber, setValidNumber] = useState(true);
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };

  const calculateTotal = () => {
    const results = refs.current.filter((element) => {
      return element !== null;
    });

    let sum = 0;
    const char = "e";

    for (let i = 0; i < results.length; i++) {
      if (results[i].innerHTML.includes(char)) {
        setValidNumber(false);
        break;
      } else {
        sum += parseInt(results[i].innerHTML);
        setValidNumber(true);
      }
    }
    console.log(validNumber);

    setTotal(sum);
  };

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
      alert(" Please - provide valid coin name");
    } finally {
      setLoading(false);
    }
  };
  const removeCrypto = (coin) => {
    const coinPosition = coinsList.indexOf(coin);
    setCoins(0);

    setCoinsList(
      coinsList.filter((element) => coinPosition !== coinsList.indexOf(element))
    );
  };

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
      />

      <div className="total-value">
        Your total assets value: $
        {validNumber === false ? " You are too rich to calculate :)" : total}
      </div>
    </div>
  );
};

export default App;
