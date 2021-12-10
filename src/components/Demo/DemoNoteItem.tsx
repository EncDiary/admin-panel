import { FC } from "react";
import { confirmationAlert } from "../../modules/sweetalert";
import { sliceText } from "../../modules/textTransform";
import store from "../../store";
import { INote } from "../../types/demo";
import Button from "../Generic/Button";

interface DemoNoteItemProps {
  note: INote;
}

const DemoNoteItem: FC<DemoNoteItemProps> = ({ note }) => {
  const confirmDeleteHandler = async () => {
    const result = await confirmationAlert(
      "Удаление записи",
      sliceText(note.text.replace(/<[^>]+>/g, ""))
    );
    if (result.isConfirmed) {
      store.demo.delete(note.id);
    }
  };

  return (
    <div className="card mb-3 bg-light">
      <div className="card-body">
        <h4 className="card-title">{note.datetime}</h4>
        <div className="card-text">{note.text}</div>
        <div className="d-flex gap-3 mt-3">
          <Button content="Edit" theme="success" />
          <Button
            content="Delete"
            theme="danger"
            onClick={confirmDeleteHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoNoteItem;
