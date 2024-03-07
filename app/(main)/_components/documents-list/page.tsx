"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Id, Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "../item/page";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumnetsListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

const DocumentsList = ({ parentDocumentId, level = 0 }: DocumnetsListProps) => {
  const params = useParams();
  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeletion level={level} />

        {level === 0 && (
          <>
            <Item.Skeletion level={level} />
            <Item.Skeletion level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages inside
      </p>

      {documents.map((doc) => {
        return (
          <div key={doc._id}>
            <Item
              id={doc._id}
              onClick={() => onRedirect(doc._id)}
              label={doc.title}
              icon={FileIcon}
              documentIcon={doc.icon}
              active={params.documentId === doc._id}
              level={level}
              onExpand={() => onExpand(doc._id)}
              expanded={expanded[doc._id]}
            />

            {expanded[doc._id] && (
              <DocumentsList parentDocumentId={doc._id} level={level + 1} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default DocumentsList;
