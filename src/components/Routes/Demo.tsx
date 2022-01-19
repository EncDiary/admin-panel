import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { aesDecrypt, aesEncrypt } from "../../modules/crypto";
import { createNoteRequest, getNotesRequest } from "../../modules/request/demo";
import { errorAlert } from "../../modules/sweetalert";
import store from "../../store";
import { INote } from "../../types/demo";
import { IAccount } from "../../types/user";
import DemoNoteList from "../Demo/DemoNoteList";
import DemoNoteSetter from "../Demo/DemoNoteSetter";
import { SetEditor } from "../Generic/Editor";
import H1 from "../Generic/Title";

const Demo: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const editor = SetEditor("");
  const account: IAccount = useOutletContext();

  const closeModal = () => {
    editor?.commands.clearContent();
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const serverResponse = await getNotesRequest(account);
      if (!serverResponse) return;

      const notes: INote[] = [];
      serverResponse.data.notes.forEach(
        (note: {
          id: string;
          ciphertext: string;
          datetime: string;
          iv: string;
          salt: string;
        }) => {
          const text = aesDecrypt(note.ciphertext, note.salt, note.iv);
          notes.push({ id: note.id, text, datetime: +note.datetime * 1000 });
        }
      );
      store.demo.setNotes(notes);
    };
    fetchNotes();
  }, [account]);

  const createHandler = async () => {
    const text = editor?.getHTML() || "";

    if (text.length < 8) {
      errorAlert("Сначала введите текст записи");
      return;
    }

    const cipherNote = aesEncrypt(text);
    const serverResponse = await createNoteRequest(cipherNote, account);
    if (!serverResponse) return;

    store.demo.create({
      id: serverResponse.data.id,
      text,
      datetime: serverResponse.data.datetime * 1000,
    });
    closeModal();
  };

  return (
    <Container style={{ maxWidth: 800 }}>
      <H1>Demo</H1>
      <Button color="success" className="mb-3" onClick={() => setIsOpen(true)}>
        Create Note
      </Button>
      <DemoNoteList />
      <DemoNoteSetter
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={createHandler}
        editor={editor}
        headerText="Creating a note"
      />
    </Container>
  );
};

export default Demo;
