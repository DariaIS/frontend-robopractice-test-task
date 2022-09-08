import React, { InputHTMLAttributes } from 'react';

type Props = {
    className?: string,
} & InputHTMLAttributes<HTMLInputElement>;

export const InputText: React.FC<Props> = ({ value, className, ...rest }) => {
    return <input type="text" className={(className ? className + ' ' : '')} {...rest} />;
};