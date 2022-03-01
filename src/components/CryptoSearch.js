import React from "react";
import { useDispatch } from "react-redux";
import { updateStore } from "../actions";
import { useState } from "react";
import axios from "axios";

const CryptoSearch = () => {
  const onInputChange = (event) => {
    event.preventDefault();
    setCoin(event.target.value);
  };

  const [currentCoin, setCoin] = useState("bitcoin");
  const dispatch = useDispatch();
  const fetchCrypto = (e) => {
    e.preventDefault()
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currentCoin}&vs_currencies=usd`;
    axios.get(url).then((response) => {
      dispatch(updateStore(response.data));
      setCoin(response.data)
      console.log(response.data)
    });
  };
  console.log(currentCoin);

  return (
    <div className="search-bar ui segment">
      <form className="ui form" onSubmit={() => fetchCrypto()}>
        <div className="field">
          <label>Add your asset</label>
          <input
            onChange={onInputChange}
            value={currentCoin}
            type="text"
          ></input>
        </div>
      </form>
      <button onClick={() => fetchCrypto()}></button> 
    </div>
  );
};

export default CryptoSearch;
//