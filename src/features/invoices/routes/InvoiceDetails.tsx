import { useEffect, useRef } from "react";
import { Col, Row, Table } from "antd";
import "antd/dist/antd.css";
import { useGetInvoice } from "../api/getInvoice";
import { Invoice, InvoiceItems } from "../type";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store";
import { toast } from "react-toastify";
import Loader from "@/components/Elements/Loaders/Loader";
import { HiOutlineArchive } from "react-icons/hi";
import { InvoiceCustomHeader } from "../components/InvoiceCustomHeader";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import _ from "lodash"



export const InvoiceDetails = () => {
  let { invoiceId } = useParams();
  const ref = useRef(null);
  const { data, isLoading, isError } = useGetInvoice<Invoice>(
    invoiceId as string
  );

  

  // const sumReducer = useMemo((key, data) => (data || []).reduce((previous, current) => {
  //   return previous + current[constant[key]]
  // }, 0), [])

  const calculateTotal = () => {
    return data?.items?.reduce((prev, current) => {
        return prev + (current.quantity * current.unitPrice)
    },0)

  }
  console.log(calculateTotal())

  const error = useAppSelector((state) => state.error.error);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  let component: JSX.Element = <></>;
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data || isError) {
    component = (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
      >
        <HiOutlineArchive className="h-10 w-10" />
        <h4>No Invoices Found</h4>
      </div>
    );
  }

  if (data) {
    console.log(data)
    component = (
      <div ref={ref} className="px-24 bg-white py-11" id="capture">
        <Row gutter={24} style={{ marginTop: 32 }}>
          <Col span={8}>
            <h3><strong>{_.upperFirst(data.serviceProvider.companyName)}</strong></h3>
            <div>{data.serviceProvider.address}</div>
            <div>{data.serviceProvider.city}</div>
            <div>{data.serviceProvider.country}</div>
          </Col>
          <Col span={8} offset={8}>
            <table>
              <tr>
                <th>Invoice Date :</th>
                <td>{new Date(data.createdAt).toDateString()}</td>
              </tr>
              <tr>
                <th>Due Date :</th>
                <td>{new Date(data.createdAt).toDateString()}</td>
              </tr>
            </table>
          </Col>
        </Row>

        <Col style={{ marginTop: 48 }}>
          <div>Bill To: </div>
          <div>
            <strong>{data.client.name}</strong>
          </div>
          <div>{data.client.city}</div>
          <div>{data.client.country}</div>
        </Col>

        <div style={{ marginTop: 48 }}>
          <Table
            dataSource={[
              ...data.items as Array<InvoiceItems>
            ]}
            pagination={false}
            className="bg-black text-white" 
          >
            <Table.Column title="Product Name" dataIndex="productName" />
            <Table.Column title="Description" dataIndex="description" />
            <Table.Column title="Unit Price" dataIndex="unitPrice" />
            <Table.Column title="Quantity" dataIndex="quantity" />
          </Table>
        </div>

        <Row style={{ marginTop: 48 }}>
          <Col span={8} offset={16}>
            <table>
              <tr>
                <th>Gross Total :</th>
                <td>USD. {calculateTotal()}</td>
              </tr>
              <tr>
                <th>Tax @6% :</th>
                <td>USD. {calculateTotal() as number * .06}</td>
              </tr>
              <tr>
                <th>Net Total :</th>
                <td>USD. {calculateTotal() as number * 1.06 }</td>
              </tr>
            </table>
          </Col>
        </Row>

        <Col style={{ marginTop: 48, textAlign: "left" }}>
          <div><strong>Note: </strong></div>
          <>{data.note}</>
        </Col>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <InvoiceCustomHeader 
        title={"Invoice"} 
        buttonText={"Go back"} 
        ref={ref}
        startIcon={<IoMdArrowRoundBack />}
        />
      {component}
    </div>
  )
  
};
