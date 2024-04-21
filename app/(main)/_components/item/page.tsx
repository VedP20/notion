"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  PlusIcon,
  Trash,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  onClick: () => void;
  label: string;
  icon: LucideIcon;
}

export const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!id) return;

    const promise = archive({ id }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Noted moved to trash",
      error: "Failed to archive note",
    });
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note create!",
      error: "Error creating new note",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        " group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className=" shrink-0 mr-2 text-[18px] text-muted-foreground">
          {documentIcon}
        </div>
      ) : (
        <Icon className=" shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className=" truncate">{label}</span>

      {isSearch && (
        <kbd className=" ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span> k
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex item-center gap-x-2">
          <div
            role="button"
            className=" opacity-0 group-hover:opacity-100 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-800 ml:auto"
            onClick={onCreate}
          >
            <PlusIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity:0 group-hover:opacity-100 ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2 text-red-400" />
                <span className="text-red-400">Delete</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

Item.Skeletion = function ItemSkeletion({ level }: { level: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className=" flex gap-x-2 py-[3px]"
    >
      <Skeleton className=" h-4 w-4" />
      <Skeleton className=" h-4 w=[30%]" />
    </div>
  );
};
