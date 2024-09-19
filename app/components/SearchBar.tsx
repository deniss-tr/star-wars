"use client";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { useModalContext } from '../context/ErrorModalContext';
import Loader from '../components/Loader';

type Character = {
  id: string;
  name: string;
  birthYear: string;
};

interface SearchBarProps {
  onSearch: (characters: Character[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { openModal } = useModalContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortedAsc, setSortedAsc] = useState<boolean>(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useMemo(() => {
    if (error) {
      openModal(error.message);
    }
    if (data) {
      setCharacters(() => [...data.allPeople.people]);
    }
  }, [data, error]);

  const filteredCharacters = characters.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCharacters = filteredCharacters.sort((a, b) =>
    sortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  useEffect(() => {
    onSearch(sortedCharacters);
  }, [searchQuery, sortedAsc, characters]);

  return (
    <>
        <div className="sticky top-0 bg-gray-900 rounded-md z-10 p-4 shadow-md">
        <input
          type="text"
          placeholder="Search characters..."
          className="w-full p-2 rounded-md mb-4 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-between items-center text-center">
          <div className="flex items-center">
              <span className="text-white">Sort by Name:</span>
              <button
              className={`p-2 ml-2 ${
                  sortedAsc ? "bg-blue-600" : "bg-gray-600"
              } text-white rounded-md min-w-16`}
              onClick={() => setSortedAsc(!sortedAsc)}
              >
              { sortedAsc ? 'ASC' : 'DESC' }
              </button>
          </div>
        </div>
      </div>
      { loading ? <Loader /> : null }
    </>
  );
};

export default SearchBar;
