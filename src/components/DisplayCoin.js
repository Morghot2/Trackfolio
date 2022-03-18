import React, { useState, useEffect, useRef } from "react";

const DisplayCoin = ({ coinsList, removeCrypto }) => {
  const [coins, setCoins] = useState({});
  const refs = useRef([]);
  const onCoinEnter = (event) => {
    event.preventDefault();
    setCoins(event.target.value);
  };


  return (
    coinsList.map((coin) => {
      return (
        <div className="coin-container" key={coin.name}>
          <div className="column">
            <div className="ui segment">
              {coinsList.indexOf(coin) + 1}.
              <img src={`${coin.image.thumb}`} alt="symbol"></img>
              {coin.name}
            </div>
          </div>
          <div className="column">
            <div className="ui segment">{coin.market_data.current_price.usd}</div>
          </div>
          <div className="column">
            <div className="ui segment">
              <input
                type="number"
                name="amount"
                onChange={onCoinEnter}
                /*value={coinValue}*/ id={coin.name}
              />
            </div>
          </div>
          <div className="column">
            <div
              className="ui segment value"
              ref={(element) => {
                refs.current[coinsList.indexOf(coin)] = element;
              }}
            >
              {document.getElementById(`${coin.name}`)
                ? document.getElementById(`${coin.name}`).value *
                  coin.market_data.current_price.usd
                : 0}
            </div>
          </div>
          <button
            onClick={() => {
              removeCrypto(coin);
            }}
            className="ui button negative"
          >
            Delete
          </button>
        </div>
      );
    })
  )
};

export default DisplayCoin;
