import Button from "@/components/Elements/Button/Button";
import Modal from "@/components/Modal/Modal";
import useDisclosure from "@/hooks/useDisclosure";
import { ChangeEvent, useState } from "react";
import { InvoiceItems } from "../type";
import { InvoiceItemForm } from "./invoice.styles";
import InvoiceProductItem from "./InvoiceProductItem";

interface InvoiceProductListProps {
  invoiceItems: InvoiceItems[]
  setInvoiceItems: (e: any) => void
}
const InvoiceProductList = (props: InvoiceProductListProps) => {
  const { invoiceItems, setInvoiceItems} = props
  const { open, isOpen, close } = useDisclosure();
  const [invoiceItem, setInvoiceItem] = useState<InvoiceItems>({
    productName: '',
    quantity: 0,
    unitPrice: 0,
    description: ''
  })


  function handleSetInvoiceItem() {
    setInvoiceItems([
      ...invoiceItems,
      invoiceItem
    ])
    close()
  }

  function handleChange (label: string) { 
    return ( e: ChangeEvent<HTMLInputElement>) => {
      setInvoiceItem( prevState => ({
        ...prevState,
        [label]: e.target.value
      }))
    }
    
  }


  return (
    <>
      {isOpen && (
        <Modal
          closeHandler={close}
          saveHandler={async () => handleSetInvoiceItem()}
          title="Add Invoice Item"
          size="lg"
        >
          <InvoiceItemForm>
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="productName"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                value={invoiceItem.productName}
                onChange={handleChange('productName')}
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="productName"
                placeholder=""
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="description"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                value={invoiceItem.description}
                onChange={handleChange('description')}
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="description"
                placeholder=""
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="quantity"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                value={invoiceItem.quantity}
                onChange={handleChange('quantity')}
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="quantity"
                placeholder=""
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label
                htmlFor="unitPrice"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Unit Price
              </label>
              <input
                type="number"
                value={invoiceItem.unitPrice}
                onChange={handleChange('unitPrice')}
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="unitPrice"
                placeholder=""
              />
            </div>
          </InvoiceItemForm>
        </Modal>
      )}
      <div className="mb-20">
        <Button type="button" variant="dark" size="sm" onClick={open}>
          Add Invoice Item
        </Button>
        <table className="min-w-full mt-4 table-auto overflow-x-auto">
          <thead className="bg-green-100 dark:bg-green-700">
            <tr>
              <th
                scope="col"
                className=" py-3 text-xs font-medium  text-gray-700 uppercase dark:text-gray-400"
              >
                Product Name
              </th>
              <th
                scope="col"
                className=" px-6 text-xs font-medium  text-gray-700 uppercase dark:text-gray-400"
              >
                Description
              </th>
              <th
                scope="col"
                className=" px-6 text-xs font-medium  text-gray-700 uppercase dark:text-gray-400"
              >
                Quantity
              </th>
              <th
                scope="col"
                className=" px-6 text-xs font-medium  text-gray-700 uppercase dark:text-gray-400"
              >
                Unit Price
              </th>
              <th
                scope="col"
                className=" px-6 text-xs font-medium  text-gray-700 uppercase dark:text-gray-400"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              invoiceItems.length === 0 ?
              <tr className="text-center">
              <td colSpan={5}> No Product listed </td>
            </tr> :
              invoiceItems.map((item) => (
                <InvoiceProductItem key={item.productName} {...item}/>
              ))
            }
           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InvoiceProductList;
