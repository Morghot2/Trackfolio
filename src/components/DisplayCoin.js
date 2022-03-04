import React, {useEffect} from "react";


const DisplayCoin = ({ currentCoin }, { coinsList }) => {
  //useEffect(() => {}, [coinsList])
  if (!coinsList) {
    return <div>There is no coin</div>;
  } else {
    coinsList.map((coin) => {
      return (
        <div className="ui equal width grid">
          <div className="column">
            <div className="ui segment">
              <img src={`${coin.image}`} alt="bitcoin"></img>
              {coin.name}
            </div>
          </div>
          <div className="eight wide column">
            <div className="ui segment">2</div>
          </div>
          <div className="column">
            <div className="ui segment">3</div>
          </div>
        </div>
      );
    });
  }
};

export default DisplayCoin;
//return coinsList.map((coin) => {})
