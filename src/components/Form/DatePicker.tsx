import clsx from 'clsx'
import { useField, useFormikContext } from 'formik'
import ReactDatePicker from 'react-datepicker'
import FieldWrapper from './FieldWrapper'
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
    name: string,
    className?: string
    label: string

}

export const DatePickerField = (props: DatePickerProps) => {
  const {  className, label, name, ...otherProps} = props;

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  console.log((field.value, new Date(field.value)))
  return (
    <FieldWrapper name={name} label={label}>
      <ReactDatePicker
        {...field}
        {...otherProps}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        )}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val: any) => {
          setFieldValue(field.name, val);
        }}
      />
        
    </FieldWrapper>
    
  );
};

