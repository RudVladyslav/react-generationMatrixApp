import React from 'react';

const Input = ({setDataMethod,children}) => {
    return (
        <div>
            <h3>{children}</h3>
            <input className='input' onChange={(e) => {
                setDataMethod(Number(e.currentTarget.value))
            }} type="number"/>
        </div>
    );
};

export default Input;