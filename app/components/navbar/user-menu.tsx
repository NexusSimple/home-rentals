"use client";

import Avatar from "@/app/components/avatar";
import MenuItem from "@/app/components/navbar/menu-item";
import useLoginModalStore from "@/app/hooks/useLoginModalStore";
import useRegisterModalStore from "@/app/hooks/useRegisterModalStore";
import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModalStore = useRegisterModalStore();
  const loginModalStore = useLoginModalStore();

  const toggleOpen = useCallback(() => {
    setIsOpen((currentValue) => !currentValue);
  }, []);
  // Is useCallback necessary in the above since an empty dependency array is supplied ? ( Answer in the ChatGPT link below)
  // https://chat.openai.com/share/2c97eed0-fada-49bf-ae27-4fbf3fa212a0
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-medium py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Rent your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Trips" />
                <MenuItem onClick={() => {}} label="My Favourites" />
                <MenuItem onClick={() => {}} label="My Reservations" />
                <MenuItem onClick={() => {}} label="My Properties" />
                <MenuItem onClick={() => {}} label="Rent my Home" />
                <hr />
                <MenuItem onClick={() => {}} label="Log Out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModalStore.onOpen} label="Login" />
                <MenuItem onClick={registerModalStore.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
