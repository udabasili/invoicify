import React from 'react'
import { Price } from '../types/index'

export const PriceItem = (props: Price) => {
  const { title, features, price} = props
  return (
    <div className="shadow-lg rounded-2xl w-64 bg-white dark:bg-green-800 p-4">
      <p className="text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">
        {title}
      </p>
      <p className="text-gray-900 dark:text-white text-3xl font-bold">
        ${price}
      </p>
      <ul className="text-sm text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
        {
          features.split(',').map((feature, i) => (
            <li className="mb-3 flex items-center ">
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="6" height="6" stroke="currentColor" fill="#10b981" viewBox="0 0 1792 1792">
            <path d="M1412 734q0-28-18-46l-91-90q-19-19-45-19t-45 19l-408 407-226-226q-19-19-45-19t-45 19l-91 90q-18 18-18 46 0 27 18 45l362 362q19 19 45 19 27 0 46-19l543-543q18-18 18-45zm252 162q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
            </path>
          </svg>
          {feature}
        </li>
          ))
        }
        
      
      </ul>
      <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        Choose plan
      </button>
    </div>

  )
}
