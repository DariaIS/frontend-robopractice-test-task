import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';

import { userType } from '../../../../types';

type Props = {
    data: userType[]
};

type ISortConfig = {
    key: keyof userType | null,
    day: number | null,
    direction: string | null;
};

export const useUsersTable = (props: Props) => {
    const [range, setRange] = useState(0);
    const [slice, setSlice] = useState<userType[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState('10');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const [sortConfig, setSortConfig] = useState<ISortConfig>({
        key: null,
        day: null,
        direction: null
    });

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

    const requestSort = (key: keyof userType, day: number | null) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, day, direction });
    }

    const sorting = (data: userType[]) => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key) {
                    let newA: string | string[] = '';
                    let newB: string | string[] = '';
                    switch (sortConfig.day) {
                        case null:
                            [newA, newB] = [a[sortConfig.key], b[sortConfig.key]]
                            break;

                        default:
                            [newA, newB] = [
                                a[sortConfig.key][sortConfig.day],
                                b[sortConfig.key][sortConfig.day]
                            ]
                            break;
                    }
                    if (newA < newB)
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    if (newA > newB)
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }

    const searchTable: userType[] = useMemo(
        () => searchRows(sorting(props.data), search),
        [search, props.data, sortConfig],
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
        sortConfig,
        handleClickPage,
        handleChangeInput,
        handleChangeSelect,
        requestSort
    };
};