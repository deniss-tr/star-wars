"use client";
import Link from 'next/link';
import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "./graphql/queries";

type ListCharacter = {
  id: string;
  name: string;
  birthYear: string;
};

export default function CharacterList() {
  const [characters, setCharacters] = useState<ListCharacter[]>([]);
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useMemo(() => {
    if (data) {
      setCharacters(() => [...data.allPeople.people]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <ul className="space-y-4 mt-4">
        {characters.map((person: ListCharacter) => (
          <li
            key={person.id}
            className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-gray-400">Birth Year: {person.birthYear}</p>
            <Link href={`/${person.id}`}>
              <span className="mt-2 inline-block text-blue-500">View Details</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
