import { userType, dataType } from '@src/types';

export const byDays = (data: dataType[]): userType[] => {

    const getDate = (time: string) => new Date(0, 0, 0, parseInt(time.split("-")[0], 10), parseInt(time.split("-")[1], 10), 0, 0);

    const timeDiffer = (start: string, end: string) => {
        const [tempStart, tempEnd] = [getDate(start), getDate(end)];
        const milliseconds = Math.abs(tempEnd.getTime() - tempStart.getTime());

        const [minutes, hours] = [
            Math.floor((milliseconds / 1000 / 60) % 60),
            Math.floor((milliseconds / 1000 / 60 / 60) % 24)
        ]
        return `${hours}:${minutes}`;
    }

    const getTotalTime = (days: string[]) => {
        let [hours, minutes] = [0, 0];
        days.forEach(time => {
            if (time !== '0') {
                hours += parseInt(time.split(":")[0], 10);
                minutes += parseInt(time.split(":")[1], 10);
            }
        })

        const [resMinutes, resHours] = [
            Math.floor(minutes % 60),
            hours + Math.floor(minutes / 60)
        ]

        return `${resHours}:${resMinutes}`;
    }

    return data.map((user): userType => {
        const days: string[] = [];
        [...Array(32).keys()].slice(1).forEach(day => {
            const dayData = user.Days.find(item => new Date(item.Date).getDate() === day);
            const time = dayData ? timeDiffer(dayData.Start, dayData.End) : '0';
            days[day] = time;
        });

        return {
            Fullname: user.Fullname,
            Days: days,
            TotalTime: getTotalTime(days)
        }
    })
};