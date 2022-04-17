import clsx from 'clsx';
import { Field } from 'formik';
import FieldWrapper from './FieldWrapper';


type TextAreaFieldProps = {
  className?: string;
  containerClassName?: string;
  name: string,
  label: string
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { label, className,  name , containerClassName = ''} = props;
  return (
    <FieldWrapper label={label} name={name} containerClassName={containerClassName} >
      <Field
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        name={name}
        as="textarea"
      />
    </FieldWrapper>
  );
};