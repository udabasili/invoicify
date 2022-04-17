import Link from '@/components/Elements/Link/Link'
import FormComponent from '@/components/Form/Form'
import { InputField } from '@/components/Form/InputField'
import { useAuth } from '@/lib/auth'
import { z } from 'zod'
import { RegisterCredentialsDTO } from '../types'

export type AuthUser  = {
  userId: string,
  name: string,
  companyName: string,
  address: string,
  city: string
  country: string
  logo?: string
  confirmPassword: string
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(7, "Password must be at least 7 characters"),
  logo: z.string().optional(),
  country: z.string(),
  companyName: z.string(),
  address: z.string(),
  city: z.string(),
  confirmPassword: z.string(),
  name: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
})

const initialValues = {
  email: '',
  password: '',
  logo: '',
  name: '',
  country: '',
  companyName: '',
  address: '',
  city: '',
  confirmPassword: ''
}

const RegisterForm = () => {

  const { registerFn } = useAuth();

  return (
    <FormComponent<RegisterCredentialsDTO, typeof schema>
      schema={schema}
      onSubmitHandler={registerFn}
      initialValues={initialValues}
      onSuccessFunction={() => () => {}}
    >
      <Link to="/login" className="mb-3 self-center">
        Already  Registered?
      </Link>
      <InputField
        label="Name"
        name="name"
        type="text"
        required
        placeholder="Enter name"
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        required
        placeholder="Enter email"
      />
      <InputField
        label="Company name"
        name="companyName"
        type="text"
        required
        placeholder="Enter name"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        required
        placeholder="Please input your password"
        className="my-4"
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        required
        placeholder=""
        className="my-4"
      />
      <InputField
        label="Address"
        name="address"
        type="text"
        required
        placeholder="Enter address"
      />
      <InputField
        label="City"
        name="city"
        type="text"
        required
        placeholder="Enter city"
      />
      <InputField
        label="Country"
        name="country"
        type="text"
        required
        placeholder="Enter country"
      />
    </FormComponent>
  
  )
}

export default RegisterForm