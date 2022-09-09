import React, { ButtonHTMLAttributes  } from 'react';

import styles from "./index.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonDefault: React.FC<Props> = ({ className, ...rest }) => {
    return <button className={(className ? className + ' ' : '')} {...rest} />;
};