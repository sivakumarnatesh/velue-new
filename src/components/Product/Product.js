import React from 'react';
import './Product.scss';
import ProductTop from './ProductTop';
import ProductTable from './ProductTable';

function Product() {
  return (
    <div className='ProductContainer'>
      <ProductTop />
      <ProductTable />
    </div>
  )
}

export default Product;