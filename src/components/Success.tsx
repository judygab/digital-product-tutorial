import React from 'react'

type Props = {}

const Success = (props: Props) => {
  return (
    <div className='border rounded px-6 py-8 flex-col flex mt-8 items-start h-min container'><h1>Your order confirmation</h1>
      <p className='text-gray-900'>You will receive an email with your order shortly.</p>
    </div>
  )
}

export default Success