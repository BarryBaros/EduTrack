import Image from "next/image";

interface UserCardProps {
    type: string;
    count: number;
}

const UserCard: React.FC<UserCardProps> = ({ type, count }) => {
    return (
        <div className="rounded-2xl odd:bg-lamaSky even:bg-lamaRedLight p-4 flex-1">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
                <Image src="/more.png" alt="" width={20} height={20} />
            </div>
            <h1 className="2xl font-semibold my-4">{count}</h1>
            <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
        </div>
    );
};

export default UserCard;
