import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputDate: React.FC<Props> = ({ value, className, ...rest }) => {
    return <input type="date" value={value} className={(className ? className + ' ' : '')} {...rest} />;
};