import { DatePickerField } from '@/components/Form/DatePicker'
import FormComponent from '@/components/Form/Form'
import { InputField } from '@/components/Form/InputField'
import { SelectField } from '@/components/Form/SelectField'
import { TextAreaField } from '@/components/Form/TextareaField'
import { useGetClients } from '@/features/clients/api/getClients'
import { Client } from '@/features/clients/types'
import { useNavigate } from 'react-router-dom'
import { ZodType } from 'zod'

type CustomProps<TForm, Schema> =  {
    schema: Schema
    initialValues: TForm
    onSubmitHandler: (e: any) => {};
    onSuccessFunction: () => {}
    selectedClient?: string

}
export const CustomForm = <TForm, Schema extends ZodType<TForm>>({
    schema,
    initialValues, 
    onSubmitHandler,
    onSuccessFunction, 
    selectedClient = ''
}: CustomProps<TForm, Schema>) => {

    let clientList: Client[] = [];

  const { data } = useGetClients<Client[]>();

  if (data?.length) {
    clientList = data;
  }

  const navigate = useNavigate();

  return (
    <>
        <FormComponent<TForm, Schema>
          schema={schema}
          onSubmitHandler={onSubmitHandler}
          onSuccessFunction={onSuccessFunction}
          initialValues={initialValues}>
          <InputField
          label="Project Name"
          name="projectName"
          type="text"
          required
          placeholder=""
        />
        <TextAreaField name='summary' label="Write a quick summary of the project"/>
        <DatePickerField name='dueDate' label='Due Date' />
        <SelectField 
          name='clientId' 
          options={clientList.map((client) =>  ({
            label: client.name,
            value: client.userId
          }))} 
          label='Select Client' 
          defaultValue={selectedClient} 
          navigate={() => {
            navigate('/client', {
              state: {
                type: 'form'
              }
            })
          }}
          placeholder='Select your client'/>
          
        </FormComponent>
    </>
  )
}
