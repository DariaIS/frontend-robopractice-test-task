import React, { InputHTMLAttributes } from 'react';

import { InputText } from './InputText';
import { InputNumber } from './InputNumber';
import { InputDate } from './InputDate';

// import styles from "./index.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ type, className, ...rest }) => {
    switch (type) {
        case 'text':
            return <InputText className={(className ? className + ' ' : '')} {...rest} />;
        case 'number':
            return <InputNumber className={(className ? className + ' ' : '')} {...rest} />;
        case 'date':
            return <InputDate className={(className ? className + ' ' : '')} {...rest} />;
        default:
            return null;
    }
};