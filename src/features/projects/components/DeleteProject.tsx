
import {  ConfirmationDialog } from '@/components/Elements';
import { HiTrash } from 'react-icons/hi';
import { useDeleteProject } from '../api/deleteProject';
import Button from '@/components/Elements/Button/Button';

type DeleteProjectProps = {
  id: string;
  triggerButton: React.ReactElement

};


export const DeleteProject = ({ id, triggerButton }: DeleteProjectProps) => {
  const { deleteProjectFn } = useDeleteProject();

  return (
      <ConfirmationDialog
        icon="danger"
        title="Delete Project"
        body="Are you sure you want to delete this discussion?"
        triggerButton={triggerButton}
        confirmButton={
          <Button
            type="button"
            variant="primary" 
            size="sm"
            className="bg-red-600"
            onClick={async () => await deleteProjectFn(id)}
          >
            Delete Project
          </Button>
        }
      />
  );
};