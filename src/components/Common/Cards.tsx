import { memo } from 'react';


interface Props {
  title: string;
  data: number;
  handleClick: () => void;
}


const Cards = memo(({ title, data, handleClick }: Props) => {
  return (
    <div
      onClick={handleClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-1 active:scale-95"
    >
      <h2 className="text-lg font-semibold text-gray-700 tracking-tight">{title}</h2>
      <p className="text-4xl font-extrabold text-indigo-600 mt-2 animate-pop-in">
        {data}
      </p>
      <div className="mt-3 h-1 w-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
});


Cards.displayName = 'Cards'; 

export default Cards;