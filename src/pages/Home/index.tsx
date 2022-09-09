import React from 'react';
import { UsersTable } from "./UsersTable";

import { useFetch } from '@hooks';

export const Home: React.FC = () => {
    const { data } = useFetch();

    return (
        <div>
            <UsersTable
                data={data}
                firstCol={{ key: 'Fullname', value: 'User' }}
                cols={{key: 'Days', value: [...Array(32).keys()].slice(1).map(String)}}
                lastCol='TotalTime' />
        </div>
    );
};