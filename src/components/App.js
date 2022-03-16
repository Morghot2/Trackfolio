import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";

const App = () => {
  const [coin, setCoin] = useState("");
  const [coinsList, setCoinsList] = useState([]);
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };
  const fetchCrypto = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
    if (coinsList.some((element) => element.id === coin)) {
      return null;
    } else {
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
      <div className="search-bar ui segment">
        <div className="ui action input">
          <input
            type="text"
            placeholder="Search..."
            onChange={onInputChange}
            value={coin}
          />
          <button
            className="ui button"
            type="submit"
            onClick={() => fetchCrypto()}
          >
            Search
          </button>
        </div>
      </div>
      <DisplayCoin coinsList={coinsList} removeCrypto={removeCrypto} />
      <div>Your total assets value: </div>
    </div>
  );
};

export default App;
