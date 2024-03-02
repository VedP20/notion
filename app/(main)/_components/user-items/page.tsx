import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRightIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserItems = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className=" flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex item-center max-w-[150px]">
            <Avatar className=" h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.firstName}&apos;s Jotion
            </span>
          </div>
          <ChevronsLeftRightIcon
            size={20}
            className="rotate-90 ml-2 text-muted-foreground"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className=" flex flex-col space-y-4 p-2">
          <Avatar className=" h-5 w-5">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <div>
            <p className=" text-sm font-medium leading-none text-primary">
              {user?.fullName}
            </p>
            <small className=" text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </small>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className=" w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton> Log out </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItems;
