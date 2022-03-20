import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";
import "../style.css";
import search from "../search.png";
const App = () => {
  const refs = useRef([]);
  const [coin, setCoin] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };
  const calculateTotal = () => {
    let start = 0;
    for (let i = 0; i < refs.current.length; i++) {
      start += parseInt(refs.current[i].innerHTML);
      console.log(start);
      console.log(typeof parseInt(refs.current[i].innerHTML));
      console.log(refs);
    }
  };

  const fetchCrypto = () => {
    const btn = document.getElementById("fetchButton");
    const disabling = () => {
      btn.disabled = true;
      setTimeout(() => {
        btn.disabled = false;
        console.log("Button Activated");
      }, 300);
    };
    const url = `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    if (coinsList.some((element) => element.id === coin)) {
      return null;
    } else {
      disabling();
      axios.get(url).then((response) => {
        setCoinsList((coinList) => [...coinList, response.data]);
      });
      
    }

    console.log(coin);
  };
  const removeCrypto = (coin) => {
    const coinPosition = coinsList.indexOf(coin);
    setCoinsList(
      coinsList.filter((element) => coinPosition !== coinsList.indexOf(element))
    );
  };

  return (
    <div className="coin-app">
      <div className="search-bar">
        <div className="form-wrapper">
          <h1 className="coin-text">Search a currency</h1>
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
            >
              <img src={search} alt="search" className=""></img>
            </button>
          </div>
        </div>
      </div>
      <div className="titles">
        <div className="property"></div>
        <div className="property">Name</div>
        <div className="property">Price</div>
        <div className="property">Amount</div>
        <div className="property">Asset Value</div>
        <div className="property"></div>
      </div>
      <DisplayCoin
        coinsList={coinsList}
        removeCrypto={removeCrypto}
        calculateTotal={calculateTotal}
      />
      <div>
        Your total assets value:
        <button onClick={calculateTotal()}></button>
      </div>
    </div>
  );
};

export default App;
