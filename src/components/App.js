import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";
import '../style.css'


const App = () => {
  const refs = useRef([]);
  const [coin, setCoin] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };
  const calculateTotal = () => {
    let start = 0
    for (let i = 0; i < refs.current.length; i++) {
      start += parseInt(refs.current[i].innerHTML) 
      console.log(start)
      console.log(typeof parseInt(refs.current[i].innerHTML))
      console.log(refs)
    }
  }
  

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
    <div>
      <div className="search-bar">
        <div className="ui action input">
          <input
            className="coin-input"
            type="text"
            placeholder="Search..."
            onChange={onInputChange}
            value={coin}
          />
          <button
            className="ui-button"
            id="fetchButton"
            type="submit"
            onClick={() => (coin !== "" ? fetchCrypto() : null)}
          >
            Search
          </button>
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
      <DisplayCoin coinsList={coinsList} removeCrypto={removeCrypto} calculateTotal={calculateTotal}/>
      <div>
        Your total assets value:
        <button onClick={calculateTotal()}></button>
      </div>
    </div>
  );
};

export default App;
