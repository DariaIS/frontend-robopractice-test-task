import { useEffect, useState } from 'react';

import { byDays } from '../utils';
import { userType } from '../types';

export const useFetch = () => {
    const [data, setData] = useState<userType[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error occurred!')
                }
                return response.json()
            })
            .then(data => setData(byDays(data)))
            .catch(err => console.log(err))
    }, []);

    return {
        data
    };
};