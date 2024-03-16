import React from "react";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archieve = useMutation(api.documents.archive);

  const onArchieve = () => {
    const promise = archieve({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash..",
      success: "Note move to trash!",
      error: "Faile to archive note",
    });

    router.push("/documents");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} variant={"ghost"}>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="end"
          alignOffset={8}
          forceMount
        >
          <DropdownMenuItem onClick={onArchieve}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="text-xs text-muted-foreground p-2">
            Last edited by: {user?.fullName}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

Menu.Skeleton = function TitleSkeleton() {
  return (
    <>
      <Skeleton className="h-6 w-24 rounded-md" />
    </>
  );
};
