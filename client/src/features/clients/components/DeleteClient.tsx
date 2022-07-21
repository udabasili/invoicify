import {  ConfirmationDialog } from '@/components/Elements';
import Button from '@/components/Elements/Button/Button';
import { useDeleteClient } from '../api/deleteClient';

type DeleteClientProps = {
  id: string;
  triggerButton: React.ReactElement
};

export const DeleteClient = ({ id, triggerButton }: DeleteClientProps) => {
  const { deleteClientFn } = useDeleteClient();

  return (
      <ConfirmationDialog
        icon="danger"
        title="Delete Client"
        body="Are you sure you want to delete this discussion?"
        triggerButton={triggerButton}
        confirmButton={
          <Button
            type="button"
            variant="primary" 
            size="sm"
            className="bg-red-600"
            onClick={async () => await deleteClientFn(id)}
          >
            Delete Client
          </Button>
        }
      />
  );
};