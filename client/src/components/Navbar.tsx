import Image from "next/image";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4">
            {/* Searchbar */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300px px-2">
                <Image src="/search.png" alt="Search" width={10} height={10} />
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
            </div>
            
            {/* Icons and User */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                    <Image src="/message.png" alt="Messages" width={14} height={14} />
                </div>

                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative ">
                   
                    <Image src="/announcement.png" alt="Announcements" width={14} height={14} />
                    <div className="absolute-top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">1</div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <span className="text-xs leading-3 font-medium">Austin</span>
                        <span className="text-[10px] text-gray-500 text-right">Admin</span>
                    </div>
                    <Image src="/avatar.png" alt="User Avatar" width={30} height={30} className="rounded-full" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
