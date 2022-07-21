import React from 'react'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { useUpdateInvoice } from '../api/updateInvoice';
import { Invoice } from '../type';
import { DeleteInvoice } from './DeleteInvoice';
import { UpdateInvoice } from './UpdateIvoice';

export const InvoiceItem = (props: Invoice) => {
  const {client, dueDate, paymentStatus, invoiceId} = props
  const navigate = useNavigate();

  const { updateInvoiceFn } = useUpdateInvoice();

  const handleChange = async ( e: React.ChangeEvent<HTMLInputElement>) => {
    let checked: "paid" | "pending"  = e.target.checked ? 'paid' : 'pending'
    await updateInvoiceFn({
      invoiceId,
      paymentStatus: checked
    })
  }

  return (
    <tr className="flex mb-3 flex-col lg:table-row odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
       <td className="py-3 px-6 text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <input type="checkbox" checked={paymentStatus === "paid"} onChange={handleChange}/>
      </td>
      <td className="py-3 px-6 text-xs font-medium  text-gray-900 whitespace-nowrap dark:text-white">
        {client.name}
      </td>
      <td className="py-3 px-6 text-xs font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
        {(new Date(dueDate)).toDateString()}
      </td>
      <td className="py-3 px-6 text-xs font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
        200
      </td>
      <td className="py-3 px-6 text-xs font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
        {paymentStatus}
      </td>
      <td className="py-3 flex justify-between px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        <span title='View'>
        <AiFillEye fontSize=".95rem" color="white" cursor="pointer" onClick={() => navigate(`/invoice/${invoiceId}`)}/>
        </span>
        <span title="Edit">
          <UpdateInvoice
            invoiceData={props}
            TriggerButton={
              <AiFillEdit fontSize=".95rem" color="white" cursor="pointer" />
            }
          />
        </span>
        <span title="Delete">
          <DeleteInvoice
            id={invoiceId}
            triggerButton={
              <ImBin fontSize=".95rem" color="red" cursor="pointer" />
            }
          />
        </span>
          
    
      </td>
 
    </tr>
  )
}
