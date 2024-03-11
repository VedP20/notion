import React from "react";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/search-modal";

interface BannerProp {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProp) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Successfully deleted the document!",
      error: "Failed to delete the document!",
    });

    router.push("/documents");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Successfully restored the document!",
      error: "Failed to restore the document!",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the trash</p>

      <Button
        size={"sm"}
        variant={"outline"}
        className=" border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        onClick={onRestore}
      >
        Restore Page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className=" border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
