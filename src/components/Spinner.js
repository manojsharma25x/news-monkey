import React, { Component } from 'react';
import loading from './img/loading.gif';

export class Spinner extends Component {
  render() {
    return <div className='text-center d-flex justify-content-center'>
        <img src={loading} alt="" width={200}/>
    </div>;
  }
}

export default Spinner;
