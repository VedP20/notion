import { useState } from "react";
import { useTheme } from "next-themes";
import { Block } from "@blocknote/core";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { useEdgeStore } from "@/app/lib/edgestore";

import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";

interface EdiotrProps {
  onChange?: (value: string) => void;
  initialContent?: any;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EdiotrProps) => {
  const { resolvedTheme } = useTheme();

  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,

    uploadFile: handleUpload,
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      editable
      onChange={() => {
        // Saves the document JSON to state.
        // setBlocks(editor.document);
        if (onChange) {
          onChange(JSON.stringify(editor.document, null, 2));
        }
      }}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
