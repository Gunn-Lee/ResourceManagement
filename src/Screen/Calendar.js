import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = () => {
    const [calendarInfo, setCalendarInfo] = useState({});
    const [frame, setFrame] = useState([]);
    const today = new Date();

    //function returns firstday, lastday and number of days of selected month in date format
    const getCalendarInfo = (month, year) => {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDay();
        const days = new Date(year, month + 1, 0).getDate();
        console.log(firstDay, lastDay, days);

        return {
            firstDay: firstDay,
            lastDay: lastDay,
            days: days,
        };
    };

    //render calendar based on selected month and year
    const renderCalendar = () => {
        let calendarArray = [];
        let days = calendarInfo.days;
        let firstDay = calendarInfo.firstDay;
        let lastDay = calendarInfo.lastDay;
        let rows = Math.round((firstDay + days + (6 - lastDay)) / 7);
        console.log(rows);

        for (let i = 0; i < 7 * rows; i++) {
            if (i < firstDay || i > days - 1 + firstDay) {
                calendarArray.push("");
            } else {
                calendarArray.push(i - firstDay + 1);
            }
        }
        console.log(calendarArray);
        return (
            <table className='calendar'>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {calendarArray.map((day, index) => {
                        return (
                            <td className='dayBox' key={index}>
                                <p className='dayBoxTop'>{day}</p>
                                <p
                                    className='dayBoxContent'
                                    onClick={() => console.log(day)}>
                                    {day === today.getDate() && "*"}
                                </p>
                            </td>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    useEffect(() => {
        setCalendarInfo(getCalendarInfo(today.getMonth(), today.getFullYear()));
        setFrame(renderCalendar());
    }, []);

    return <div>{frame}</div>;
};

export default Calendar;
