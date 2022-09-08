import React, { useState } from 'react';

import { useUsersTable } from './hooks';
// import styles from './index.module.scss';

type Props = {
    firstCol: {
        key: string,
        value: string
    },
    cols: string[],
    lastCol: string
};

export const UsersTable: React.FC<Props> = ({ firstCol, cols, lastCol }) => {
    const [page, setPage] = useState(1);
    const {
        slice,
        range,
        rowsPerPage,
        minRows,
        maxRows,
        handleChangeInput,
        handleChangeRowsNum,
    } = useUsersTable({ page });

    return (
        <div className='pageContainer section'>
            <input type='text' placeholder='Search'
                name={firstCol.key}
                onChange={(e) => handleChangeInput(e)}
            />
            <table>
                <thead>
                    <tr>
                        <th>
                            {firstCol.value}
                        </th>
                        {
                            cols.map((col, index) => (
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
                {slice.length !== 0 && (
                    <tbody>

                    </tbody>
                )}
                {/* {console.log('new data', slice)} */}
            </table>
        </div>
    );
};