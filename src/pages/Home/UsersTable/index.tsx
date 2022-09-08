import React, { useState } from 'react';

import { userType } from '../../../types';

import { Pagination } from '../../../components/sections';

import { useUsersTable } from './hooks';

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
    const {
        slice,
        range,
        rowsPerPage,
        page,
        handleClickPage,
        handleChangeInput,
        handleChangeSelect
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