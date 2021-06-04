import React from 'react'

interface Props {
  onChange: (event: any) => void;
  value: string | undefined;
  name: string;
}

function ColorPicker({ onChange, value, name }: Props) {
  return (
    <div className="border border-[#323438] rounded-lg flex overflow-hidden h-8">
      <input
        type="color"
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        className="w-8 h-full border-[#323438] border rounded-md transform scale-105 cursor-pointer scale-x-150 translate-x-1.5"
      />
      <input
        // eslint-disable-next-line max-len
        className="w-full inline-block outline-none focus:border-transparent border-transparent bg-none pl-5"
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default ColorPicker
