import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { mutation } from "@/convex/_generated/server";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/app/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
      removeCover({
        id: params.documentId as Id<"documents">,
      });
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted-foreground"
      )}
    >
      {!!url && (
        <Image src={url} alt="banner-image" fill className="object-cover" />
      )}

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => coverImage.onReplace(url)}
            className=" text-muted-foreground text-xs"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Banner
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={onRemove}
            className=" text-muted-foreground text-xs"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
