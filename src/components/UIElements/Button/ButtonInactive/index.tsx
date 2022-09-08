import React, { ButtonHTMLAttributes  } from 'react';

// import styles from "./index.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonInactive: React.FC<Props> = ({ className, ...rest }) => {
    return <button disabled className={(className ? className + ' ' : '')} {...rest} />;
};