import React, { useEffect, useState } from "react";
import close from "../close.png";

const DisplayCoin = ({
  coinsList,
  removeCrypto,
  refs,
  calculateTotal,
  coins,
  setCoins,
}) => {
  const onValueEnter = (event, coinIndex) => {
    event.preventDefault();
    setCoins(event.target.value);
  };
  useEffect(() => {
    calculateTotal();
  }, [coins, coinsList]);
  return coinsList.map((coin) => {
    return (
      <div key={coin.name}>
        <div className="coin-container">
          <div className="segment">
            {coinsList.indexOf(coin) + 1}.
            <img
              src={`${coin.image.thumb}`}
              alt="symbol"
              className="coin-icon"
            ></img>
            {coin.name}
          </div>

          <div className="price-segment">
            {coin.market_data.current_price.usd}
          </div>

          <div className="input-segment">
            <input
              className="amount-input"
              type="number"
              name="amount"
              maxLength="5"
              onChange={onValueEnter}
              id={coin.name}
            />
          </div>

          <div
            className="value-segment"
            ref={(element) => {
              refs.current[coinsList.indexOf(coin)] = element;
            }}
          >
            {document.getElementById(`${coin.name}`)
              ? (
                  document.getElementById(`${coin.name}`).value *
                  coin.market_data.current_price.usd
                ).toFixed(2)
              : 0}
          </div>
          <div className="segment-delete-button">
            {" "}
            <button
              onClick={() => {
                removeCrypto(coin);
              }}
              className="delete-button"
            >
              <img src={close} alt="Delete" className="delete-img" />
            </button>
          </div>
        </div>
      </div>
    );
  });
};

export default DisplayCoin;
