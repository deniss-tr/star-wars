"use client";
import Link from 'next/link';
import { useState } from "react";
import SearchBar from "./components/SearchBar";

type ListCharacter = {
  id: string;
  name: string;
  birthYear: string;
};

export default function CharacterList() {
  const [ filteredCharacters, setFilteredCharacters] = useState<ListCharacter[]>([]);

  return (
    <div className="p-4">
      <SearchBar onSearch={(characters) => setFilteredCharacters(characters)} />
      <ul className="space-y-4 mt-4">
        {filteredCharacters.map((person: ListCharacter) => (
          <li
            key={person.id}
            className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-gray-400">Birth Year: {person.birthYear}</p>
            <Link href={`/${person.id}`}>
              <span className="mt-2 inline-block text-blue-500 hover:text-white transition duration-500">
                View Details
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
