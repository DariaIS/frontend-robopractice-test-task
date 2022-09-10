import React, { ButtonHTMLAttributes } from "react";

import { ButtonDefault } from './ButtonDefault';
import { ButtonInactive } from './ButtonInactive';

import styles from "./index.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    isDisabled?: boolean
};

export const Button: React.FC<Props> = ({ children, className, isDisabled, ...rest }) => {
    switch (isDisabled) {
        case true:
            return (
                <ButtonInactive className={(className ? className + ' ' : '') + styles.button} {...rest}>
                    {children}
                </ButtonInactive>
            )
        default:
            return (
                <ButtonDefault className={(className ? className + ' ' : '') + styles.button} {...rest}>
                    {children}
                </ButtonDefault>
            )

    }
};