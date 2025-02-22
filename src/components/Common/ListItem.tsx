interface Props {
  title: string;
  subTitle: string;
  img?: string;
}

const ListItem = ({ title, subTitle, img }: Props) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
    
      <div className={`${img ? 'w-16 h-16 bg-gray-200 rounded-full mr-4 overflow-hidden' : 'hidden'}`}>
        {img && <img src={img} alt={`${title} image`} className="object-cover w-full h-full" />}
      </div>

      
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out">{title}</p>
        <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out">{subTitle}</p>
      </div>
    </div>
  );
};

export default ListItem;
