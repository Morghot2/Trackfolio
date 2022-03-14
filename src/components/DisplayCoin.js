import React, { useState } from "react";

const DisplayCoin = ({ coinsList }) => {
  const [coins, setCoins] = useState({});
  const onCoinEnter = (event) => {
    event.preventDefault();
    setCoins(event.target.value);
  };

  //console.log(coinsList)
  //useEffect(() => {}, [coinsList])
  if (!coinsList) {
    return <div>There is no coin</div>;
  } else {
    return coinsList.map((coin) => {
      // const inputVariable = document.getElementById('coin').value
      // console.log(inputVariable)
      return (
        <div className="ui equal width grid" key={coin.name}>
          <div className="column">
            <div className="ui segment">
              <img src={`${coin.image}`} alt="symbol"></img>
              {coin.name}
            </div>
          </div>
          <div className="column">
            <div className="ui segment">
              {coin.market_data.current_price.usd}
            </div>
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
            <div className="ui segment">
              {document.getElementById(`${coin.name}`)
                ? document.getElementById(`${coin.name}`).value *
                  coin.market_data.current_price.usd
                : 0}
            </div>
          </div>
        </div>
      );
    });
  }
};

export default DisplayCoin;
//return coinsList.map((coin) => {})
// () => {
//   const coin = document.getElementById('div').value
//   return coin * coin.market_data.current_price.usd
// }
// const inputVariable = document.getElementById('coin').value
// console.log(inputVariable)
