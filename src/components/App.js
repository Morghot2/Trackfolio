import React from "react";
import CryptoSearch from "./CryptoSearch";
import PostCrypto from "./PostCrypto";
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";

const App = () => {
  const [coin, setCoin] = useState([]);
  //const [coinImage, setCoinImage] = useState({});
  const [currentCoin, setCurrentCoin] = useState({});
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };
  const fetchCrypto = () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false
    `;
    //const imageUrl = `https://api.coinicons.net/icon/:/:128x128`;
    axios.get(url).then((response) => {
      setCurrentCoin(response.data);
      console.log(coin);
      console.log(response.data.image);
    });
    // axios.get(imageUrl).then((response) => {
    //   setCoinImage(response.data);
    //   console.log(coinImage)
    // });
  };
  useEffect(() => {}, []);

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
      <DisplayCoin currentCoin={currentCoin}>
        <DisplayCoin />
      </DisplayCoin>
    </div>
  );
};

export default App;
// <button type='submit' onClick={() => fetchCrypto()}></button>

/* <form className="ui form" onSubmit={() => fetchCrypto()}>
  <div className="field">
    <label>Add your asset</label>
    <input onChange={onInputChange} value={coin} type="text"></input>
  </div>
</form>; */
