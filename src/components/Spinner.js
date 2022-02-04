import React from 'react';
import loading from './img/loading.gif';

const Spinner = ()=> {

    return <div className='text-center d-flex justify-content-center'>
        <img src={loading} alt="" width={200}/>
    </div>;
  
}

export default Spinner;
