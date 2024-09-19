"use client";
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from '../graphql/queries';
import DetailTable from "../components/DetailTable"
import FilmTable from "../components/FilmTable";
import { useEffect } from "react";
import { useModalContext } from '../context/ErrorModalContext';
import Loader from '../components/Loader';

export default function CharacterDetails({ params }: { params: { id: string } }) {
  const { openModal } = useModalContext();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id: decodedId },
  });

  useEffect(() => {
    if (error) {
      openModal(error.message);
    }
  }, [error]);

  if (loading) return <Loader />;

  const { person: {
    name = '',
    species = '',
    homeworld = '',
    birthYear = '',
    gender = '',
    height = '',
    mass = '',
    filmConnection: { films = [] } = {}
  } = {} } = data || {};

  return (
    <div className="p-4">
      <button
        className="bg-gray-800 text-white rounded-md px-5 py-2 mt-4 hover:bg-gray-900"
        type="button"
        onClick={() => router.back()}
      >
        Go back
      </button>
      <div className="mt-3">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="text-xl mb-2">
          <strong>Birth Year:</strong> {birthYear}
        </p>
        <p className="text-xl mb-2">
          <strong>Gender:</strong> {gender}
        </p>
        <p className="text-xl mb-2">
          <strong>Height:</strong> {height} cm
        </p>
        <p className="text-xl mb-2">
          <strong>Weight:</strong> {mass} kg
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {<DetailTable title="Species" details={species || []} />}
          {<DetailTable title="Homeworld" details={homeworld || []} />}
        </div>
        <div className="mt-4">
          <FilmTable films={films || []} />
        </div>
      </div>
    </div>
  );
}
