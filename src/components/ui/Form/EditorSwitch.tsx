import React, { FC } from 'react'
import { Switch } from '@headlessui/react';

interface Props {
  isActive: boolean;
  onChange: () => void;
  name?: string;
}

function EditorSwitch({ isActive, onChange, name }: Props) {
  return (
    <Switch
      id={name}
      name={name}
      checked={isActive}
      onChange={onChange}
      className="relative inline-flex items-center h-6 rounded-full w-11 bg-white shadow-sm focus:outline-none"
    >
      <span
        className={`${
          isActive ? 'translate-x-6 bg-main' : 'translate-x-1 bg-gray-400'
        } inline-block w-4 h-4 transform rounded-full transition-transform`}
      />
  </Switch>
  )
}

export default EditorSwitch
