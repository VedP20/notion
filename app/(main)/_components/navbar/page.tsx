"use client";

import React from "react";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Title } from "../title";
import Banner from "../banner";

interface INavbar {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: INavbar) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params?.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <div className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </div>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className=" bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            className="h-4 w-4 text-muted-foreground"
            onClick={onResetWidth}
          />
        )}

        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
        </div>
      </nav>

      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
