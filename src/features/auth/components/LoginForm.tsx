import FormComponent from "@/components/Form/Form";
import { useAuth } from "@/lib/auth";
import { InputField } from "@/components/Form/InputField";
import { z } from "zod";
import { LoginCredentialsDTO } from "../types";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { loginFn } = useAuth();

  return (
    <FormComponent<LoginCredentialsDTO, typeof schema>
      schema={schema}
      onSubmitHandler={loginFn}
      onSuccessFunction={() => () => {}}
      initialValues={initialValues}
    >
      <InputField
        label="Email"
        name="email"
        type="email"
        required
        placeholder="Please input your email"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        required
        placeholder="Please input your password"
        className="my-4"
      />
     
    </FormComponent>
  );
};


export default LoginForm;
