import React, { useState, useEffect, useRef } from "react";

const DisplayCoin = ({ coinsList, removeCrypto }) => {
  const [coins, setCoins] = useState({});
  const refs = useRef([]);
  const onCoinEnter = (event) => {
    event.preventDefault();
    setCoins(event.target.value);
  };

  return coinsList.map((coin) => {
    return (
      <div>
        {" "}
        <div className="coin-container" key={coin.name}>
          <div className="segment">{coinsList.indexOf(coin) + 1}.
          
            {" "}
            <img src={`${coin.image.thumb}`} alt="symbol"></img>
            {coin.name}
          </div>

          <div className="value-segment">{coin.market_data.current_price.usd}</div>

          <div className="segment">
            <input
              type="number"
              name="amount"
              onChange={onCoinEnter}
              /*value={coinValue}*/ id={coin.name}
            />
          </div>

          <div
            className="value-segment"
            ref={(element) => {
              refs.current[coinsList.indexOf(coin)] = element;
            }}
          >
            {document.getElementById(`${coin.name}`)
              ? (document.getElementById(`${coin.name}`).value *
                coin.market_data.current_price.usd).toFixed(2)
              : 0}
          </div>
          <div className="segment">
            {" "}
            <button
              onClick={() => {
                removeCrypto(coin);
              }}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
        <hr></hr>
      </div>
    );
  });
};

export default DisplayCoin;
