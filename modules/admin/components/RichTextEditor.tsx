import "../richtext.css";
import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import {
  RiBold as Bold,
  RiItalic as Italic,
  RiUnderline as UnderlineIcon,
  RiLink as LinkIcon,
  RiImage2Line as ImageIcon,
  RiAlignLeft as AlignLeft,
  RiAlignCenter as AlignCenter,
  RiAlignRight as AlignRight,
  RiAlignJustify as AlignJustify,
} from "react-icons/ri";
import Button from "@/components/ui/Button";

type RichtextProps = {
  content?: string;
  onChange?: (content: string) => void;
};

let timeout: any = null;

const Richtext: React.FC<RichtextProps> = ({ content = "", onChange }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const editor = useEditor({
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter") {
          event.preventDefault();
          // Ubacuje novi prazan red
          editor?.commands.insertContent("<br><br>"); // Ubacuje dva <br> za razmak između redova
          return true;
        }
        return false;
      },
    },
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-[#006ab0] underline",
        },
      }),
      Image,
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "text-[40px]",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }), // Omogućava poravnanje teksta
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        if (timeout) {
          clearTimeout(timeout);
          return;
        }

        setTimeout(() => {
          onChange(editor.getHTML());
        }, 1000);
      }
    },
  });

  useEffect(() => {
    if (content) {
      if (!mounted) {
        editor?.commands.setContent(content);
        setMounted(true);
        return;
      }
    }
  }, [content]);

  const setLink = useCallback(() => {
    const url = prompt("Enter link URL");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="w-full tiptaps">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </Button>
        <Button type="button" variant="secondary" onClick={setLink}>
          <LinkIcon size={16} />
        </Button>
        <Button type="button" variant="secondary" onClick={addImage}>
          <ImageIcon size={16} />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} />
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify size={16} />
        </Button>
      </div>

      {/* Editor */}
      <div className="border-[5px] p-5 border-border-primary text-text-primary">
        <EditorContent editor={editor} className="border-0 outline-none" />
      </div>
    </div>
  );
};

export default Richtext;
