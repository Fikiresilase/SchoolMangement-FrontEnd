
interface Props {
  defaultOption:string
  data: any[]

  setSelected:(selected:string)=>void
}

const Filter = ({ defaultOption, data, setSelected }: Props) => {

  return (
    <div>
      <select className="p-2 border border-slate-900 rounded-sm m-2" onChange={(e)=>setSelected(e.target.value)} >
        <option  >
           {defaultOption}
        </option>
        {data.map((d, index) =>
          <option key={index}  >{d}</option>)}
      </select>
    </div>
  )
}

export default Filter
