interface Props {
  defaultOption: string;
  data: any[];
  setSelected: (selected: string) => void;
}

const Filter = ({ defaultOption, data, setSelected }: Props) => {
  return (
    <div className="inline-block">
      <select
        className="p-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 transition duration-150 ease-in-out"
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">{defaultOption}</option>
        {data.map((d, index) => (
          <option key={index} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
