interface Props {
    title: string
    data:number
    handleClick:()=>void
}

const Cards = ({title,data,handleClick}:Props) => {
  return (
    <div onClick={handleClick} className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer ">
          <h2 className="text-xl font-medium text-gray-700">{title}</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{data}</p>
        </div>
  )
}

export default Cards
