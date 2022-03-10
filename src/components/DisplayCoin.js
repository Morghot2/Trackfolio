import React, { useEffect, useState } from "react";

const DisplayCoin = ({ coinsList }) => {
  const [coinValue, setCoinValue] = useState(0)
  const onValueEnter = (event) => {
    event.preventDefault();
    setCoinValue(event.target.value);
  };
  
  
  //console.log(coinsList)
  //useEffect(() => {}, [coinsList])
  if (!coinsList) {
    return <div>There is no coin</div>;
  } else {
    return coinsList.map((coin) => {
      
      
      return (
        
        <div className="ui equal width grid" key={coin.name}>
          <div className="column">
            <div className="ui segment">
              <img src={`${coin.image}`} alt="symbol"></img>
              {coin.name}
            </div>
          </div>
          <div className="column">
            <div className="ui segment">{coin.market_data.current_price.usd}</div>
          </div>
          <div className="column">
            <div className="ui segment"><input type="number" name="amount" onChange={onValueEnter} value={coinValue}/></div>
          </div>
          <div className="column">
            <div className="ui segment">{coin.market_data.current_price.usd * coinValue}</div>
          </div>
        </div>
      );
    });
  }
};

export default DisplayCoin;
//return coinsList.map((coin) => {})
