import React from 'react';

const CommonButton = ({onClickMethod,children}) => {
    return (
        <div>
            <button className='button-common' onClick={onClickMethod}>{children}</button>
        </div>
    );
};

export default CommonButton;