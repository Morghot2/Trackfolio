import React from "react";

const DisplayCoin = ({ currentCoin }) => {
  return (
    <div className="ui equal width grid">
      <div className="column">
        <div className="ui segment"><img src={`${currentCoin.image}`} alt='bitcoin'></img>{currentCoin.name}</div>
      </div>
      <div className="eight wide column">
        <div className="ui segment">2</div>
      </div>
      <div className="column">
        <div className="ui segment">3</div>
      </div>
    </div>
  );
};

export default DisplayCoin;
