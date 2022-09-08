import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';

import { byDays } from './byDays';
import { userType } from '../../../../types';

type Props = {
    page: number;
};

export const useUsersTable = (props: Props) => {
    const [data, setData] = useState<userType[]>([]);
    const [range, setRange] = useState(0);
    const [slice, setSlice] = useState<userType[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState('10');
    const [search, setSearch] = useState('');

    const [minRows, maxRows] = ['3', '15'];

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value);
    };

    const handleChangeRowsNum: ChangeEventHandler<HTMLInputElement> = (e) => {
        const [value, min, max] = [e.target.value, e.target.min, e.target.max];
        const newVal =
            parseInt(value, 10) < parseInt(min, 10) && value !== ''
                ? min
                : parseInt(value, 10) > parseInt(max, 10)
                    ? max
                    : value;
        setRowsPerPage(newVal);
    };

    const searchRows = (data: userType[], search: string) => {
        return data.filter((item) => item.Fullname.includes(search));
    };

    const calculateRange = (data: userType[], rowsPerPage: string): number => {
        return Math.ceil(data.length / parseInt(rowsPerPage, 10));
    };

    const sliceData = (
        data: userType[],
        page: number,
        rowsPerPage: string,
    ) => {
        return data.slice(
            (page - 1) * parseInt(rowsPerPage, 10),
            page * parseInt(rowsPerPage, 10),
        );
    };

    const searchTable: userType[] = useMemo(
        () => searchRows(data, search),
        [search, data],
    );

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

    useEffect(() => {
        const range = calculateRange(
            searchTable,
            rowsPerPage !== '' ? rowsPerPage : minRows,
        );
        setRange(range);

        const tempItems = sliceData(
            searchTable,
            props.page,
            rowsPerPage !== '' ? rowsPerPage : minRows,
        );
        setSlice(tempItems);
    }, [searchTable, search, props.page, rowsPerPage, minRows]);

    return {
        slice,
        range,
        rowsPerPage,
        minRows,
        maxRows,
        handleChangeInput,
        handleChangeRowsNum,
    };
};