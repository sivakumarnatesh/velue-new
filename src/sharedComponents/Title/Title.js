import React from 'react';
import './Title.scss';

const Title = ({title,className}) => {
  return (
    <div className={className}>{title}</div>
  )
}

export default Title;