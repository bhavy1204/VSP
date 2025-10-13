import React from "react";
import { useOutletContext } from "react-router-dom";
import SearchGridVideos from "./Videos/searchGridVideos";

export default function SearchResults() {
  const { searchResults } = useOutletContext();

  return (
    <div className="p-4">
      <SearchGridVideos />
    </div>
  );
}
