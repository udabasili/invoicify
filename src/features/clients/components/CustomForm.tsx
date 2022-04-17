import FormComponent from '@/components/Form/Form'
import { InputField } from '@/components/Form/InputField'
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
}: CustomProps<TForm, Schema>) => {

  

  return (
    <>
        <FormComponent<TForm, Schema>
          schema={schema}
          onSubmitHandler={onSubmitHandler}
          onSuccessFunction={onSuccessFunction}
          initialValues={initialValues}>
        <InputField
          label="Name"
          name="name"
          type="text"
          required
          placeholder=""
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          required
          placeholder="Please input your email"
        />
        <InputField
          label="Address"
          name="address"
          type="text"
          required
          placeholder=""
        />
        <InputField
          label="City"
          name="city"
          type="text"
          required
          placeholder=""
        />
        <InputField
          label="Country"
          name="country"
          type="text"
          required
          placeholder=""
        />
          
        </FormComponent>
    </>
  )
}
