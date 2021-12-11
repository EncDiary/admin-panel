import { Editor, EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { FC } from "react";
import "./Editor.scss";
import { Button } from "reactstrap";

interface MenuBarButtonProps {
  onClick?: () => void;
  isEnabled?: boolean;
  text: string;
}

export const SetEditor = (text: string) => {
  return useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      History,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: text,
  });
};

const MenuBar: FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center mb-2 flex-wrap">
      <MenuBarButton
        text="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isEnabled={editor.isActive("bold")}
      />
      <MenuBarButton
        text="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isEnabled={editor.isActive("italic")}
      />
      <MenuBarButton
        text="Unord.List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isEnabled={editor.isActive("bulletList")}
      />
      <MenuBarButton
        text="Ord.List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isEnabled={editor.isActive("orderedList")}
      />
      <MenuBarButton
        text="Unord.List"
        onClick={() => editor.chain().focus().undo().run()}
      />
      <MenuBarButton
        text="Ord.List"
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
};

export const EditorPanel: FC<{ editor: Editor | null }> = ({ editor }) => {
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

const MenuBarButton: FC<MenuBarButtonProps> = ({
  onClick,
  isEnabled = false,
  text,
}) => {
  return (
    <Button
      color="dark"
      outline={!isEnabled}
      onClick={onClick}
      size="sm"
      className="mx-1 mb-2"
    >
      {text}
    </Button>
  );
};
