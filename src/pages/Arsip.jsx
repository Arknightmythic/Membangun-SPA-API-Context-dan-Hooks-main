import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import Search from "../components/Search";
import ItemList from "../components/ItemList";

const Arsip = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const { locale } = React.useContext(LocaleContext);

  
  React.useEffect(() => {
    const fetchNotesDataArchived = async () => {
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
      }
      setIsLoading(false);
    };

    fetchNotesDataArchived();

   
    return () => {
      setNotes([]);
    };
  }, []);


  const onKeywordChangedHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };


  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <main className="homepage">

      <section className="search-bar">
        <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
        <Search keyword={keyword} keywordChange={onKeywordChangedHandler} />
      </section>


      <Suspense fallback={<div>{locale === "id" ? "Memuat..." : "Loading..."}</div>}>
        {isLoading ? (
          <div>{locale === "id" ? "Memuat catatan..." : "Loading notes..."}</div>
        ) : (
          <ItemList notes={filteredNotes} />
        )}
      </Suspense>
    </main>
  );
};

export default Arsip;