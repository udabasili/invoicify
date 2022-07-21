import {  ConfirmationDialog } from '@/components/Elements';
import { HiTrash } from 'react-icons/hi';
import Button from '@/components/Elements/Button/Button';
import { useDeleteGanttTask } from '../api/deleteGantTask';

type DeleteGanttTaskProps = {
  ganttTaskId: string;
  triggerButton: React.ReactElement
  projectId: number
};


export const DeleteGanttTask = ({ ganttTaskId, triggerButton, projectId }: DeleteGanttTaskProps) => {
  const { deleteGanttTaskFn } = useDeleteGanttTask();

  return (
      <ConfirmationDialog
        icon="danger"
        title="Delete GanttTask"
        body="Are you sure you want to delete this discussion?"
        triggerButton={triggerButton}
        confirmButton={
          <Button
            type="button"
            variant="primary" 
            size="sm"
            className="bg-red-600"
            onClick={async () => await deleteGanttTaskFn(ganttTaskId, projectId)}
          >
            Delete GanttTask
          </Button>
        }
      />
  );
};