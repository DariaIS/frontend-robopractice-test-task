export const getFilter = (direction: 'ascending' | 'descending' | null, value: '<' | '>') => {
    switch (value) {
        case '<':
            return direction === 'ascending' ? -1 : 1;
        default:
            return direction === 'ascending' ? 1 : -1;
    }
}