import React, { useState } from 'react';

import { useUsersTable } from './hooks';
// import styles from './index.module.scss';

export const UsersTable: React.FC = () => {
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
        <div className="pageContainer section">
            {
                slice.length !== 0 && (
                    <>
                        {console.log('new data', slice)}
                    </>
                )
            }
        </div>
    );
};