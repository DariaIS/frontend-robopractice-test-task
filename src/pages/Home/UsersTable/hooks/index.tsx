import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';

import { getFilter } from '../../../../utils';

import { userType } from '../../../../types';

type Props = {
    data: userType[]
};

type ISortConfig = {
    key: keyof userType | null,
    day: 'total' | number | null,
    direction: 'ascending' | 'descending' | null;
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

    const requestSort = (key: keyof userType, day: 'total' | number | null = null) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, day, direction });
    }

    const sorting = (data: userType[]) => {
        const compareTimes = (a: string, b: string, direction: 'ascending' | 'descending' | null) => {
            const [hoursA, minutesA, hoursB, minutesB] = [
                parseInt(a.split(":")[0], 10) || 0,
                parseInt(a.split(":")[1], 10) || 0,
                parseInt(b.split(":")[0], 10) || 0,
                parseInt(b.split(":")[1], 10) || 0
            ]
            if (hoursA < hoursB)
                return getFilter(direction, '<');
            if (hoursA > hoursB)
                return getFilter(direction, '>');
            if (minutesA < minutesB)
                return getFilter(direction, '<');
            if (minutesA > minutesB)
                return getFilter(direction, '>');
            return 0;
        }

        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key) {
                    switch (sortConfig.day) {
                        case null:
                            if (a[sortConfig.key] < b[sortConfig.key])
                                return getFilter(sortConfig.direction, '<');
                            if (a[sortConfig.key] > b[sortConfig.key])
                                return getFilter(sortConfig.direction, '>');
                            break;
                        case 'total':
                            return compareTimes(a[sortConfig.key].toString(), b[sortConfig.key].toString(), sortConfig.direction);
                        default:
                            return compareTimes(a[sortConfig.key][sortConfig.day], b[sortConfig.key][sortConfig.day], sortConfig.direction);
                    }

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