import React from 'react';
import './Product.scss';
import ProductTop from './ProductTop';
import ProductTable from './ProductTable';
import { useState } from 'react';

function Product() {
  const [val,setVal] = useState('');
  const searchProduct = (val) => {
    setVal(val);
  }
  return (
    <div className='ProductContainer'>
      <ProductTop searchProduct={searchProduct} />
      <ProductTable val={val} />
    </div>
  )
}

export default Product;