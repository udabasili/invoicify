import {  ConfirmationDialog } from '@/components/Elements';
import Button from '@/components/Elements/Button/Button';
import { useDeleteInvoice } from '../api/deleteInvoice';

type DeleteInvoiceProps = {
  id: string;
  triggerButton: React.ReactElement

};

export const DeleteInvoice = ({ id, triggerButton }: DeleteInvoiceProps) => {
  const { deleteInvoiceFn } = useDeleteInvoice();

  return (
      <ConfirmationDialog
        icon="danger"
        title="Delete Invoice"
        body="Are you sure you want to delete this invoice?"
        triggerButton={triggerButton}
        confirmButton={
          <Button
            type="button"
            variant="primary" 
            size="sm"
            className="bg-red-600"
            onClick={async () => await deleteInvoiceFn(id)}
          >
            Delete Invoice
          </Button>
        }
      />
  );
};