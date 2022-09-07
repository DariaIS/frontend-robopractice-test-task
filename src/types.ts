export type dataType = {
    id: number;
    Fullname: string;
    Days: {
        Date: string,
        End: string,
        Start: string
    }[];
};

export type userType = {
    Fullname: string,
    Days: string[],
    TotalTime: string
};