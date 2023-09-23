import React from 'react'
import { Product } from '../types'

const ProductCard = (props: Product) => {
  return (
    <div className='border rounded px-6 py-8 flex items-start h-min'>
      <div className='w-[100px] h-[70px]'><img src={props.image} alt={`${props.title} image`} /></div>
      <div className='flex-grow flex flex-col'>
        <div className='pl-4'>
          <h3 className='text-2xl font-bold'>{props.title}</h3>
          <p className='text-gray-900'>{props.description}</p>
        </div>
      </div>
      <div><p>${props.price}</p></div>
    </div>
  )
}

export default ProductCard