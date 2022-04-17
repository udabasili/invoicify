import clsx from "clsx";
import { Field, ErrorMessage } from "formik";
import React from "react";

type FieldWrapperProps = {
    name: string,
    label: string
    className?: string
    children: React.ReactNode
    containerClassName?: string;

}

const FieldWrapper = ({
    name,
    label,
    className,
    containerClassName = '',
    children
    }: FieldWrapperProps) => {
    return (

        <div  className={clsx('block font-light text-xs text-red-600 mb-4', containerClassName)}>
            <label 
                className={clsx('block text-sm font-medium text-gray-700', className)}
                htmlFor={name}>
                {label}
                <div className="mt-1 ">{children}</div>
            </label>
            <ErrorMessage name={name} className="text-sm  text-red-600" />
        </div>
    );
};

export default FieldWrapper;
