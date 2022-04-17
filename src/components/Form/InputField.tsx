import clsx from 'clsx'
import { Field } from 'formik'
import React from 'react'
import FieldWrapper from './FieldWrapper'

type InputFieldProps = {
    name: string,
    type: 'text' | 'email' | 'password' | 'number'
    className?: string
    label: string
    containerClassName?: string
    placeholder: string
}

export const InputField = (props: InputFieldProps & Partial<HTMLInputElement>) => {
    const { type = 'text', className, label, name, placeholder, containerClassName,  ...otherProps} = props;
  return (
    <FieldWrapper name={name} label={label} containerClassName={containerClassName}>
        <Field 
            name={name} 
            {...otherProps}
            className={clsx(
                'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                className
              )}
              placeholder={placeholder}
            type={type} />
    </FieldWrapper>
  )
}
