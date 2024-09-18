interface Film {
	title: string;
	director: string;
	episodeID: number;
	releaseDate: string;
}

interface FilmTableProps {
	films: Film[];
}

const FilmTable = ({ films }: FilmTableProps) => {
	return (
		<div className="w-full p-4 bg-gray-800 text-white rounded-lg shadow-lg mb-4">
			<h2 className="text-2xl font-semibold mb-4">Films</h2>
			<div className="grid grid-cols-1 gap-2">
					{films.map((film) => (
						<div key={film.episodeID} className="p-2 bg-gray-900 rounded-md">
							<div className="flex justify-between">
								<span className="font-medium text-gray-400">Title:</span>
								<span>{film.title}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium text-gray-400">Director:</span>
								<span>{film.director}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium text-gray-400">Episode:</span>
								<span>{film.episodeID}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-medium text-gray-400">Release Date:</span>
								<span>{new Date(film.releaseDate).toLocaleDateString()}</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default FilmTable;
  