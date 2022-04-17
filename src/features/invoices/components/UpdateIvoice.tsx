import * as z from 'zod';
import { FormDrawer } from '@/components/Form';
import { CustomForm } from './CustomForm';
import { useUpdateInvoice } from '../api/updateInvoice';
import { Invoice } from '../type';

type UpdateInvoiceProps = {
    invoiceData: Invoice
    TriggerButton: React.ReactElement
}


export const UpdateInvoice = ({ invoiceData, TriggerButton }: UpdateInvoiceProps) => {

  const { updateInvoiceFn } = useUpdateInvoice();
  const { invoiceId, title, dueDate, note, clientId} = invoiceData

  const schema = z.object({
    invoiceId: z.string(),
    title: z.string(),
    dueDate: z.any(),
    note: z.string(),
  });

  const initialValues = {
    invoiceId,
    title,
    dueDate: new Date(dueDate).toDateString(),
    note,
  };

  return (
      <FormDrawer
          triggerButton={TriggerButton}
          title="Update Discussion"
          isDone={false}>
            <CustomForm<Partial<Invoice>, typeof schema>
                schema={schema}
                onSubmitHandler={updateInvoiceFn}
                onSuccessFunction={async () => {}}
                selectedClient={clientId}
                initialValues={initialValues}
            />
       
      </FormDrawer>
  );
};