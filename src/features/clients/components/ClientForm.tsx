import { CustomHeader, CustomProps } from "@/components/CustomHeader/CustomHeader";
import FormComponent from "@/components/Form/Form";
import { InputField } from "@/components/Form/InputField";
import { IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";
import { useAddClient } from "../api/addClient";
import { ClientDTO } from "../types";
import { ClientListContainer } from "./client.styles";

const initialValues = {
  name: "",
  email: "",
  city: "",
  country: "",
  address: "",
};

const schema = z.object({
  name: z.string(),
  email: z.string(),
  city: z.string(),
  country: z.string(),
  address: z.string(),
});

export const ClientForm = ({ setCurrentState }: CustomProps) => {
  const { addClientFn } = useAddClient()
  return (
    <ClientListContainer>
      <CustomHeader
        title="Add Client"
        startIcon={<IoMdArrowRoundBack />}
        setCurrentState={setCurrentState}
        nextType="list"
        buttonText="Go back"
      />
      <FormComponent<ClientDTO, typeof schema>
        schema={schema}
        onSubmitHandler={addClientFn}
        onSuccessFunction={async () => setCurrentState('list')}
        initialValues={initialValues}
      >

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
          placeholder=""
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
    </ClientListContainer>
  );
};
