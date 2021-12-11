import { Editor } from "@tiptap/react";
import { FC } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { EditorPanel } from "../Generic/Editor";

interface DemoNoteSetterProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  editor: Editor | null;
  headerText: string;
}

const DemoNoteSetter: FC<DemoNoteSetterProps> = ({
  isOpen,
  onClose,
  headerText,
  onSubmit,
  editor,
}) => {
  return (
    <Modal toggle={onClose} isOpen={isOpen}>
      <ModalHeader toggle={onClose}>{headerText}</ModalHeader>
      <ModalBody>
        <EditorPanel editor={editor} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="success" onClick={onSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DemoNoteSetter;
