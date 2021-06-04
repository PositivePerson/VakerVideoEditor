import clsx from "clsx"

interface RadioButtonProps {
  setValue: (arg0: any) => void;
  actualRadioGroupValue: any;
  value: any;
  id: string;
  label: string;
}

const RadioButton = ({ setValue, actualRadioGroupValue, value, id, label}: RadioButtonProps) => {
  return (
    <div onClick={() => setValue(value)} className="inline-flex relative items-center justify-center gap-4 group cursor-pointer">
      <div className={clsx("rounded-full h-4 w-4 2xl:w-5 2xl:h-5 absolute -left-10", {
        "bg-main": actualRadioGroupValue === value,
        "group-hover:bg-gray-100": actualRadioGroupValue !== value
      })} id={id}  /> 
      <label htmlFor={id}>{ label }</label>
    </div>  
  )
}

export default RadioButton