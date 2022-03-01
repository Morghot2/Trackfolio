import React from "react";
import CryptoSearch from "./CryptoSearch";
import PostCrypto from "./PostCrypto";
import { useState, useEffect } from "react";
import axios from "axios";
import DisplayCoin from "./DisplayCoin";

const App = () => {
  const [coin, setCoin] = useState([]);
  const [currentCoin, setCurrentCoin] = useState({});
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };
  const fetchCrypto = () => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
    axios.get(url).then((response) => {
      setCurrentCoin(response.data);

      console.log(coin);
      console.log(currentCoin)
    });
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
      <DisplayCoin />
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
