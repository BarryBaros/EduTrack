"use client"
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
import {useState} from "react";
import Calendar from "react-calendar";

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar=()=>{
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className="bg-white rounded-md p-4 h={500} shadow-lg">
             <Calendar onChange={onChange} value={value} />
        </div>
    )
}
export default EventCalendar;