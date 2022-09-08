import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';

import { userType } from '../../../../types';

type Props = {
    data: userType[]
};

export const useUsersTable = (props: Props) => {
    const [range, setRange] = useState(0);
    const [slice, setSlice] = useState<userType[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState('10');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const handleChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setRowsPerPage(e.target.value);
    };

    const handleClickPage = (direction: 'back' | 'forward') => {
        switch (direction) {
            case 'back':
                setPage(prev => prev - 1);
                break;
            case 'forward':
                setPage(prev => prev + 1);
                break;
            default:
                break;
        }
    };

    const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value);
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
        () => searchRows(props.data, search),
        [search, props.data],
    );

    useEffect(() => {
        const range = calculateRange(searchTable, rowsPerPage);
        setRange(range);

        const tempItems = sliceData(searchTable, page, rowsPerPage);
        setSlice(tempItems);
    }, [searchTable, search, page, rowsPerPage]);

    return {
        slice,
        range,
        rowsPerPage,
        page,
        handleClickPage,
        handleChangeInput,
        handleChangeSelect,
    };
};