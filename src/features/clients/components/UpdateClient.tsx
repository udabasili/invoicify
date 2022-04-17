import * as z from 'zod';
import { FormDrawer } from '@/components/Form';
import { CustomForm } from './CustomForm';
import { useUpdateClient } from '../api/updateClient';
import { Client, ClientDTO } from '../types';

type UpdateClientProps = {
    clientData: Client
    TriggerButton: React.ReactElement
}

export const UpdateClient = ({ clientData, TriggerButton }: UpdateClientProps) => {

  const { updateClientFn } = useUpdateClient();
  const { userId, name, email, city, country, address} = clientData

  const schema = z.object({
    userId: z.string(),
    name: z.string(),
    email: z.string(),
    city: z.string(),
    country: z.string(),
    address: z.string(),
  });


  const initialValues = {
    userId,
    name,
    email,
    city,
    country,
    address
  };

  return (
      <FormDrawer
          triggerButton={TriggerButton}
          title="Update Discussion"
          isDone={false}>
            <CustomForm<ClientDTO, typeof schema>
                schema={schema}
                onSubmitHandler={updateClientFn}
                onSuccessFunction={async () => {}}
                initialValues={initialValues}
            />
       
      </FormDrawer>
  );
};