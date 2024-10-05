import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart"; 
import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
    const studentCount = 106; // Example count for students
    const teacherCount = 45;   // Example count for teachers
    const parentCount = 80;    // Example count for parents
    const staffCount = 20;     // Example count for staff

    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* USER CARDS */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student" count={studentCount} />
                    <UserCard type="teacher" count={teacherCount} />
                    <UserCard type="parent" count={parentCount} />
                    <UserCard type="staff" count={staffCount} />
                </div>
                {/* MIDDLE CHARTS */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* COUNT CHART */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart />
                    </div>
                    {/* ATTENDANCE CHART */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart />
                    </div>
                </div>
                {/* BOTTOM CHART */}
                <div className="w-full h-[500px]">
                    {/* Other content can go here */}
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <EventCalendar/>
                {/* Additional content can go here */}
            </div>
        </div>
    );
};

export default AdminPage;

