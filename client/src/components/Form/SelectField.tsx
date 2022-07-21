import clsx from 'clsx';
import { Field } from 'formik';
import React from 'react';
import Button from '../Elements/Button/Button';
import FieldWrapper from './FieldWrapper';

type Options = {
	label: React.ReactNode;
	value: string | number | string[];
};

type SelectFieldProps = {
	name: string;
	options: Options[];
	className?: string;
	label: string;
	defaultValue: string;
	placeholder: string;
	navigate: () => void;
};

export const SelectField = (props: SelectFieldProps) => {
	const { name, label, placeholder, defaultValue, className, options, navigate = () => {} } = props;
	return (
		<FieldWrapper
			name={name}
			label={label}
			className={clsx(
				'block w-full md:pl-3 md:pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
				className
			)}
		>
			<div className="flex flex-col">
				{options.length !== 0 ? (
					<Field
						placeholder={placeholder}
						name={name}
						as="select"
						defaultValue={defaultValue}
						className="mr-3 w-auto py-2 px-1  my-2"
					>
						<option value="" disabled hidden>
							Choose the Client{' '}
						</option>
						{options.map(({ label, value }) => (
							<option key={label?.toString()} value={value} className="p-4">
								{label}
							</option>
						))}
					</Field>
				) : null}

				<div></div>
			</div>
		</FieldWrapper>
	);
};
