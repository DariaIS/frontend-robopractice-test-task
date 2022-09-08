import React, { useState } from 'react';

import { useUsersTable } from './hooks';
import { userType } from '../../../types';
// import styles from './index.module.scss';

type Props = {
    data: userType[],
    firstCol: {
        key: string,
        value: string
    },
    cols: {
        key: string,
        value: string[]
    },
    lastCol: string
};

export const UsersTable: React.FC<Props> = ({ data, firstCol, cols, lastCol }) => {
    const [page, setPage] = useState(1);
    const {
        slice,
        range,
        rowsPerPage,
        minRows,
        maxRows,
        handleChangeInput,
        handleChangeRowsNum,
    } = useUsersTable({ data, page });

    return (
        <div className='pageContainer section'>
            <input type='text' placeholder='Search'
                name={firstCol.key}
                onChange={(e) => handleChangeInput(e)}
            />
            {slice.length !== 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>
                                {firstCol.value}
                            </th>
                            {
                                cols.value.map((col, index) => (
                                    <th key={index}>
                                        {col}
                                    </th>
                                ))
                            }
                            <th>
                                {lastCol}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slice.map((user, index) => (
                                <tr key={index}>
                                    <>
                                        <td>
                                            {user[firstCol.key as (keyof typeof user)]}
                                        </td>
                                        {
                                            user[cols.key as (keyof typeof user)].toString().split(',').map((day, i) => (
                                                day !== '' &&
                                                <td key={i}>
                                                    {day}
                                                </td>
                                            ))
                                        }
                                        <td>
                                            {user[lastCol as (keyof typeof user)]}
                                        </td>
                                    </>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    );
};