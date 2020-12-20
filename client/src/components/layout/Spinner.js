import React,{Fragment} from 'react';
import spinner from './spinner.gif';

export default ()=>(
    <Fragment>
        <img 
        src={spinner}
        style={{width:"70%",margin:"0 auto",display:"block"}}
        alt='Loading..'
        />
    </Fragment>
);