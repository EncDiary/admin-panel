import { FC, useState } from "react";
import parse from "html-react-parser";
import { confirmationAlert, errorAlert } from "../../modules/sweetalert";
import { sliceText } from "../../modules/textTransform";
import store from "../../store";
import { INote } from "../../types/demo";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import DemoNoteSetter from "./DemoNoteSetter";
import { getDotSeparatedDate, getTime } from "../../modules/datetime";
import { SetEditor } from "../Generic/Editor";
import { deleteNoteRequest, editNoteRequest } from "../../modules/request/demo";
import { aesEncrypt } from "../../modules/crypto";
import { useOutletContext } from "react-router-dom";
import { IAccount } from "../../types/user";
import { enc } from "crypto-js";

interface DemoNoteItemProps {
  note: INote;
}

const DemoNoteItem: FC<DemoNoteItemProps> = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const editor = SetEditor(note?.text || "");
  const account: IAccount = useOutletContext();

  const closeModal = () => {
    editor?.commands.setContent(note?.text || "");
    setIsOpen(false);
  };

  const editHandler = async () => {
    const text = editor?.getHTML() || "";

    if (text.length < 8) {
      errorAlert("Сначала введите текст записи");
      return;
    }

    if (text === note.text) {
      closeModal();
      return;
    }

    const cipherNote = aesEncrypt(
      text,
      store.crypto.findOrCalculateAesKey(enc.Hex.stringify(account.salt))
    );
    const serverResponse = await editNoteRequest(
      note.id,
      {
        ciphertext: cipherNote.ciphertext,
        iv: cipherNote.iv,
        salt: enc.Hex.stringify(account.salt),
      },
      account
    );
    if (!serverResponse) return;

    store.demo.edit(note.id, text);
    closeModal();
  };

  const confirmDeleteHandler = async () => {
    const result = await confirmationAlert(
      "Delete note",
      sliceText(note.text.replace(/<[^>]+>/g, ""))
    );
    if (result.isConfirmed) {
      const serverResponse = await deleteNoteRequest(note.id, account);
      if (!serverResponse) return;
      store.demo.delete(note.id);
    }
  };

  return (
    <Card color="light" className="mb-3">
      <CardBody>
        <CardTitle tag="h5">{getDotSeparatedDate(note.datetime)}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {getTime(note.datetime)}
        </CardSubtitle>
        <CardText tag="div">{parse(note.text)}</CardText>
        <div className="d-flex gap-3 mt-3">
          <Button color="success" onClick={() => setIsOpen(true)}>
            Edit
          </Button>
          <Button color="danger" onClick={confirmDeleteHandler}>
            Delete
          </Button>
        </div>
        <DemoNoteSetter
          isOpen={isOpen}
          onClose={closeModal}
          headerText="Editing the note"
          onSubmit={editHandler}
          editor={editor}
        />
      </CardBody>
    </Card>
  );
};

export default DemoNoteItem;
