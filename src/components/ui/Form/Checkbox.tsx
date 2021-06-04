import clsx from "clsx"

interface CheckboxProps {
  handleClick: () => void;
  value: boolean;
  id: string;
  label: string;
  labelClassName?: string;
}

const Checkbox = ({ handleClick, value, id, label, labelClassName}: CheckboxProps) => {
  return (
    <div onClick={handleClick} className="inline-flex items-center justify-center gap-4 group cursor-pointer">
      <div className={clsx("rounded-full h-4 w-4 2xl:w-5 2xl:h-5 border border-main", {
        "bg-main": value,
        "group-hover:bg-gray-100": !value
      })} id={id}  /> 
      <label className={labelClassName} htmlFor={id}>{ label }</label>
    </div>  
  )
}

export default Checkbox