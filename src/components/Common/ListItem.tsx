interface Props {
    title: string
    subTitle: string
    img?:string
}

const ListItem = ({title,subTitle,img}:Props) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className={`${img ? 'w-16 h-16 bg-gray-400 rounded-full mr-4' : 'hidden'}`}>
              {img ? <img src={title} /> : null}
          </div>  
        <div className="flex flex-col">
              <p className="font-bold text-lg text-gray-700">{ title}</p>
              <p className="text-sm text-gray-500">{ subTitle }</p>
        </div>
      </div>
  )
}

export default ListItem
