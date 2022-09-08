import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputNumber: React.FC<Props> = ({ value, className, min, max, ...rest }) => {
    return <input type="number" min={min} max={max} value={value} className={(className ? className + ' ' : '') + 'number'} {...rest} />;
};