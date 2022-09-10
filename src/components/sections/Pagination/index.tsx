import React, { ChangeEventHandler } from 'react';

import { Button } from "@UIElements";

type Props = {
    numOfRows: number,
    rowsPerPage: string,
    range: number,
    page: number,
    handleClickPage(direction: 'back' | 'forward'): void,
    handleChangeSelect: ChangeEventHandler<HTMLSelectElement>,
};

export const Pagination: React.FC<Props> = ({ numOfRows, rowsPerPage, range, page, handleClickPage, handleChangeSelect }) => {
    const [fromRow, toRow] = [
        (page - 1) * parseInt(rowsPerPage, 10) + 1,
        page * parseInt(rowsPerPage, 10) < numOfRows ? page * parseInt(rowsPerPage, 10) : numOfRows
    ]

    return (
        <div>
            <span>Rows per page</span>
            <select value={rowsPerPage} onChange={(e) => handleChangeSelect(e)}>
                {
                    [...Array(21).keys()].splice(5).map((num, index) => {
                        return <option value={num} key={index}>{num}</option>
                    })
                }
            </select>
            <span> {`${fromRow} - ${toRow}`} of {numOfRows}</span>
            <div>

            </div>
            <Button
                // className={styles.paginationButton}
                isDisabled={page === 1}
                onClick={() => handleClickPage('back')}
            >
                {'<'}
            </Button>
            <Button
                // className={styles.paginationButton}
                isDisabled={page === range || range === 0}
                onClick={() => handleClickPage('forward')}
            >
                {'>'}
            </Button>
        </div>
    );
};