import React from 'react'

class Overview extends React.Component {
  render() {
    return(
      <div className="info_right">
        <ul className="right_tags">
          <li>
            <a href="javascript:void(0)">Add a workplace</a>
            <div className="symbol_tags"></div>
          </li>
          <hr/>

          <li>
            <a href="javascript:void(0)">Add a school/university</a>
            <div className="symbol_tags"><a href="#"></a></div></li>
          <hr/>

          <li>
            <a href="javascript:void(0)">Add a address</a>
            <div className="symbol_tags"><a href="#"></a></div> </li>
          <hr/>

          <li>
            <a href="javascript:void(0)">Add a public key</a>
            <div className="symbol_tags"><a href="#"></a></div></li>
        </ul>
      </div>
    );
  }
}

export default Overview;