import React from "react";

const DisplayCoin = ({ currentCoin }) => {
  return (
    <div class="ui equal width grid">
      <div class="column">
        <div class="ui segment">{currentCoin.name}</div>
      </div>
      <div class="eight wide column">
        <div class="ui segment">2</div>
      </div>
      <div class="column">
        <div class="ui segment">3</div>
      </div>
    </div>
  );
};

export default DisplayCoin;
