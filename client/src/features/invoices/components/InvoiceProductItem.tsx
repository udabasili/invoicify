import { AiFillEdit } from 'react-icons/ai'
import { ImBin } from 'react-icons/im'
import { InvoiceItems } from '../type'

const InvoiceProductItem = (props: InvoiceItems) => {
  const { productName, description, quantity, unitPrice} = props
  return (
    <tr className="border-b odd:bg-white even:bg-green-50 odd:dark:bg-green-800 even:dark:bg-green-700 dark:border-gray-600">
      <td className="py-3  text-sm font-medium text-gray-900 text-center dark:text-white">
        {productName}
      </td>
      <td className="py-3  text-sm text-gray-500 text-center dark:text-gray-400">
        {description}
      </td>
      <td className="py-3  text-sm text-gray-500 text-center dark:text-gray-400">
        {quantity} 
      </td>
      <td className="py-3 text-sm text-gray-500 text-center dark:text-gray-400">
        ${unitPrice}
      </td>
      <td className="py-3 flex justify-around  text-sm text-gray-500 text-center dark:text-gray-400">
        <span  title='Edit'>
          <AiFillEdit fontSize="1.2rem" color="white" cursor="pointer"/>
        </span>
        <span  title='Delete'>
          <ImBin fontSize="1.2rem" color="red" cursor="pointer"/>
        </span>
      </td>
 
    </tr>
  )
}

export default InvoiceProductItem