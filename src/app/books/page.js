"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getBooks } from "@/services/api/apiGetBooks";
import { useSelector } from "react-redux";
import Image from "next/image";
import Button from "@/components/Button";

export default function Books() {
  const dataLoaderReducer = useSelector((state) => state.dataLoaderReducer);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getBooksData = useCallback(async () => {
    const data = await getBooks();
    setBooks(data);
  }, []);

  useEffect(() => {
    getBooksData();
  }, [getBooksData]);

  const handleSearch = useCallback(() => {
    setSearchTerm(document.getElementById("content").value.toLowerCase());
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value.toLowerCase());
  }, []);

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;

    return books.filter((book) =>
      book?.title?.toLowerCase().includes(searchTerm)
    );
  }, [books, searchTerm]);

  const renderBooks = useMemo(() => {
    const { isLoading } = dataLoaderReducer;

    if (isLoading) return <h3 className="font-bold text-3xl">Loading...</h3>;

    return filteredBooks?.map((book) => (
      <div
        key={book?.index ?? "idx"}
        className="bg-[#FF5733] rounded-[32px] p-10 mt-3 w-[512px]"
      >
        <Image
          alt={book?.title ?? ""}
          src={book?.cover ?? ""}
          width={100}
          height={100}
        />
        <p>{book?.releaseDate ?? "-"}</p>
        <h4>{book?.title ?? ""}</h4>
        <p>{book?.description ?? ""}</p>
      </div>
    ));
  }, [dataLoaderReducer, filteredBooks]);

  return (
    <div>
      <div className="place-content-center">
        <input
          name="content"
          id="content"
          className="bg-[whitesmoke] px-6 py-4 rounded-lg mr-3"
          placeholder="cari buku"
          onChange={handleSearchChange}
        />
        <button
          onClick={handleSearch}
          className="bg-[#FF5733] text-white text-center px-6 py-4 rounded-lg"
        >
          Cari
        </button>
      </div>
      <h2>List Buku</h2>

      <div className="place-content-around w-[100%]">{renderBooks}</div>
    </div>
  );
}
