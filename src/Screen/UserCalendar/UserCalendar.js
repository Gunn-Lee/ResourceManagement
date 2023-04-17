import React, { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useRecoilState } from "recoil";
import userInfo from "../../atom/userInfo";
import memos from "../../atom/memos";
import "react-calendar/dist/Calendar.css";
import "./UserCalendar.css";
import { useNavigate } from "react-router-dom";

const UserCalendar = () => {
    const navigate = useNavigate();
    const [value, onChange] = useState(new Date());
    const [user, setUser] = useRecoilState(userInfo);
    const [memo, setMemo] = useRecoilState(memos);
    const [memoInput, setMemoInput] = useState("");

    //useRef that will be used to focus on the input field
    const inputRef = useRef(null);

    useEffect(() => {
        if (!user.username) navigate("/login");
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        console.log(value);
        inputRef.current.focus();
    }, [value, memo]);

    const addMemoHandler = (e) => {
        let isMemoExist = false;
        e.preventDefault();
        if (!memoInput) return;
        memo.map((item) => {
            if (
                item.date === moment(value).format("YYYY/MM/DD") &&
                item.memo === memoInput
            ) {
                isMemoExist = true;
                inputRef.current.focus();
                return alert("Memo already exists");
            }
        });
        if (isMemoExist) {
            setMemoInput("");
            return;
        }
        const newMemo = {
            id: (memo[memo.length - 1] && memo[memo.length - 1].id + 1) || 1,
            date: moment(value).format("YYYY/MM/DD"),
            memo: memoInput,
        };
        setMemo((prev) => [...prev, newMemo]);
        setMemoInput("");
        console.log(memo);
    };

    const deleteMemo = (e) => {
        const newMemo = memo.filter((item) => {
            return item.memo !== e.target.previousSibling.textContent;
        });
        console.log(newMemo);
        setMemo(newMemo);
    };

    return (
        <div className='CalendarContainer'>
            <div className='CalendarApp'>
                <Calendar onChange={onChange} value={value} />
                <div className='Detail'>
                    <div className='DetailHeader'>
                        <span>{moment(value).format("YYYY/MM/DD")}</span>
                        <span>Welcome, {user.username}</span>
                    </div>
                    <div className='DetailBody'>
                        <p>Checked in: {user.checkin}</p>
                        <p>Project: </p>
                        <p className='memoList'>
                            Memo:
                            {memo.length !== 0 &&
                                memo.map((item) => {
                                    if (
                                        item.date ===
                                        moment(value).format("YYYY/MM/DD")
                                    ) {
                                        return (
                                            <p
                                                className='memoContent'
                                                key={item.id}>
                                                <span>{item.memo}</span>
                                                <button
                                                    className='deleteMemo'
                                                    onClick={(e) =>
                                                        deleteMemo(e)
                                                    }>
                                                    X
                                                </button>
                                            </p>
                                        );
                                    }
                                })}
                        </p>
                        <form
                            className='addEvent'
                            onSubmit={(e) => addMemoHandler(e)}>
                            <input
                                type='text'
                                placeholder='Add event'
                                value={memoInput}
                                onChange={(e) => setMemoInput(e.target.value)}
                                ref={inputRef}
                                className='memoInput'
                            />
                            <button className='addMemo'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCalendar;
