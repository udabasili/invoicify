import * as z from 'zod';
import { FormDrawer } from '@/components/Form';
import { useUpdateProject } from '../api/updateProject';
import { Project, ProjectDTO } from '../types';
import { CustomForm } from './CustomForm';

type UpdateProjectProps = {
    projectData: Project
    TriggerButton: React.ReactElement
}

export const UpdateProject = ({ projectData, TriggerButton }: UpdateProjectProps) => {

  const { updateProjectFn } = useUpdateProject();
  const { projectId, projectName, summary, dueDate, clientId} = projectData

  const schema = z.object({
    projectId: z.string(),
    projectName: z.string(),
    summary: z.string(),
    dueDate: z.date(),
    clientId: z.string(),
});


  const initialValues = {
        projectId,
        projectName: projectName,
        summary: summary,
        dueDate: new Date(dueDate as Date),
        clientId
    };

  return (
      <FormDrawer
            triggerButton={TriggerButton}
            title="Update Discussion"
            isDone={false}>
            <CustomForm<ProjectDTO, typeof schema>
                schema={schema}
                onSubmitHandler={updateProjectFn}
                onSuccessFunction={async () => {}}
                initialValues={initialValues}
                selectedClient={clientId}
            />
       
      </FormDrawer>
  );
};