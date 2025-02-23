import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Archive from "../components/Archive";
import Unarchive from "../components/Unarchive";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/network-data";
import Delete from "../components/Delete";
import DetailNote from "../components/DetailNote";

const Detail = () => {
  const { id } = useParams();
  const [note, setNote] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchNote = async () => {
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      }
      setIsLoading(false);
    };

    fetchNote();
  }, [id]);


  const onDeleteEventHandler = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) {
      navigate("/");
    }
  };


  const onArchiveEventHandler = async (id) => {
    const { error } = await archiveNote(id);
    if (!error) {
      navigate("/archive");
    }
  };


  const onUnarchiveEventHandler = async (id) => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      navigate("/");
    }
  };

  
  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!note) {
    return <div>Note not found.</div>;
  }

  return (
    <section className="detail-page">
  
      <DetailNote {...note} />

      
      <div className="detail-page__action">
        {note.archived ? (
          <Unarchive id={id} onUnarchive={onUnarchiveEventHandler} />
        ) : (
          <Archive id={id} onArchive={onArchiveEventHandler} />
        )}
        <Delete id={id} onDelete={onDeleteEventHandler} />
      </div>
    </section>
  );
};

export default Detail;