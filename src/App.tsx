import React from 'react';
import { UsersTable } from "./components/sections";

export const App: React.FC = () => {
    return (
        <div>
            <UsersTable
                firstCol={{ key: 'Fullname', value: 'User' }}
                cols={[...Array(32).keys()].slice(1).map(String)}
                lastCol='TotalTime' />
        </div>
    );
};