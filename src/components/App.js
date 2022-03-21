import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";
import "../style.css";
import search from "../search.png";
import { debounce } from "lodash";


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
  const btn = document.getElementById("fetchButton");
  const disabling = () => {
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
      console.log("Button Activated");
    }, 1000);
  };

  const fetchCrypto = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    disabling();
    if (coinsList.some((element) => element.id === coin)) {
      return null;
    } else {
      axios.get(url).then((response) => {
        setCoinsList((coinList) => [...coinList, response.data]);
      });
    }
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
            >
              <img src={search} alt="search" className="button-img"></img>
            </button>
          </div>
        </div>
      </div>
      <div className="coin-title-container">
        <div className="segment">Name</div>
        <div className="price-segment">Price</div>
        <div className="input-segment">Amount</div>
        <div className="value-segment">Asset Value</div>
        <div className="segment-delete-button"></div>
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
