import React, { useState } from 'react';

import { userType } from '../../../types';

import { Pagination } from '../../../components/sections';

import { useUsersTable } from './hooks';

type Props = {
    data: userType[],
    firstCol: {
        key: keyof userType,
        value: string
    },
    cols: {
        key: keyof userType,
        value: string[]
    },
    lastCol: keyof userType
};

export const UsersTable: React.FC<Props> = ({ data, firstCol, cols, lastCol }) => {
    const {
        slice,
        range,
        rowsPerPage,
        page,
        sortConfig,
        handleClickPage,
        handleChangeInput,
        handleChangeSelect,
        requestSort
    } = useUsersTable({ data });

    return (
        <div className='pageContainer section'>
            <input type='text' placeholder='Search'
                name={firstCol.key}
                onChange={(e) => handleChangeInput(e)}
            />
            {slice.length !== 0 && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort(firstCol.key)}>
                                    {firstCol.value}
                                </th>
                                {
                                    cols.value.map((col, index) => (
                                        <th key={index} onClick={() => requestSort(cols.key, parseInt(col, 10))}>
                                            {col}
                                        </th>
                                    ))
                                }
                                <th onClick={() => requestSort(lastCol, 'total')}>
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
                                                {user[firstCol.key]}
                                            </td>
                                            {
                                                user[cols.key].toString().split(',').map((day, i) => (
                                                    day !== '' &&
                                                    <td key={i}>
                                                        {day}
                                                    </td>
                                                ))
                                            }
                                            <td>
                                                {user[lastCol]}
                                            </td>
                                        </>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination
                        numOfRows={data.length}
                        rowsPerPage={rowsPerPage}
                        range={range}
                        page={page}
                        handleClickPage={handleClickPage}
                        handleChangeSelect={handleChangeSelect}
                    />
                </>
            )}
        </div>
    );
};