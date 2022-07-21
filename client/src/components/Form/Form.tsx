import { useAppSelector } from "@/store";
import { Formik, Form } from "formik";
import { useState } from "react";
import { ZodType } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../Elements/Button/Button";
import { toast } from "react-toastify";

type FormProps<TFormTypes, Schema> = {
  children: React.ReactNode;
  onSubmitHandler: (e: any) => {};
  schema?: Schema;
  initialValues: TFormTypes;
  onSuccessFunction: () => {};
};

const FormComponent = <TFormTypes, SchemaType extends ZodType<TFormTypes>>(
  props: FormProps<TFormTypes, SchemaType>
) => {
  const {
    schema,
    onSubmitHandler,
    children,
    initialValues,
    onSuccessFunction = () => {},
  } = props;
  const [isLoading, setLoading] = useState(false);
  const error = useAppSelector((state) => state.error.error);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(schema as SchemaType)}
      onSubmit={async (values: TFormTypes, { setSubmitting }) => {
        setLoading(true);
        setSubmitting(true);
        const response = await onSubmitHandler(values);
        if (error) {
          toast.error(error);
        }
        setLoading(false);
        setSubmitting(false);
        if (response === "success") {
          onSuccessFunction();
        }
      }}
    >
      <Form className="flex flex-col mt-5 ">
        {children}
        <Button
          className="self-center"
          size="md"
          variant="primary"
          type="submit"
          isLoading={isLoading}
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

Form.propTypes = {};

export default FormComponent;
