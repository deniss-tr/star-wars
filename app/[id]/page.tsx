"use client";
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from '../graphql/queries';
import DetailTable from "../components/DetailTable"
import FilmTable from "../components/FilmTable";

export default function CharacterDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  console.log('params', params);
  const decodedId = decodeURIComponent(params.id);

  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id: decodedId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { species, homeworld, filmConnection: { films = [] } = {} } = data.person;

  return (
    <div className="p-4">
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-4">{data.person.name}</h1>
        <p className="text-xl mb-2">
          <strong>Birth Year:</strong> {data.person.birthYear}
        </p>
        <p className="text-xl mb-2">
          <strong>Gender:</strong> {data.person.gender}
        </p>
        <p className="text-xl mb-2">
          <strong>Height:</strong> {data.person.height} cm
        </p>
        <p className="text-xl mb-2">
          <strong>Weight:</strong> {data.person.mass} kg
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {<DetailTable title="Species" details={species || []} />}
          {<DetailTable title="Homeworld" details={homeworld || []} />}
        </div>
        <div className="mt-4">
          <FilmTable films={films || []} />
        </div>
        <button className="bg-gray-800 text-white rounded-md px-5 py-2 mt-4" type="button" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    </div>
  );
}
