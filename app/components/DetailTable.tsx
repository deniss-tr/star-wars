interface DetailTableProps {
  title: string;
  details: Record<string, string | number | string[]>;
}

const DetailTable = ({ title = '', details }: DetailTableProps) => {
  const detailsArray = Object.entries(details);

  if (!detailsArray.length) {
    return (
      <div className="w-full md:w-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p>No available information</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg mb-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-2">
        {detailsArray.map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between p-2 bg-gray-900 rounded-md"
          >
            <span className="capitalize font-medium text-gray-400">
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
            </span>
            <span className="font-light text-end">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTable;
