import React, { InputHTMLAttributes } from 'react';

import { InputText } from './InputText';
import { InputNumber } from './InputNumber';
import { InputDate } from './InputDate';

import styles from "./index.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ type, className, ...rest }) => {
    switch (type) {
        case 'text':
            return <InputText className={(className ? className + ' ' : '') + styles.input} {...rest} />;
        case 'number':
            return <InputNumber className={(className ? className + ' ' : '') + styles.input} {...rest} />;
        case 'date':
            return <InputDate className={(className ? className + ' ' : '') + styles.input} {...rest} />;
        default:
            return null;
    }
};