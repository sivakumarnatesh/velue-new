import React from 'react';
import './Message.scss';

const Message = ({Header,subHeader,className}) => {
  return (
    <div className='Titles'>
        <div className='Header'>{Header}</div>
        <div className={className}>{subHeader}</div>
    </div>
  )
}

export default Message;