import { Fragment, ReactElement, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import clsx from 'clsx';

interface ISelectOption<TValue> {
    label: string;
    value: TValue;
}

interface ISelectProps<TValue> {
    items: Array<ISelectOption<TValue>>;
    initialValue: TValue | null;
    className?: string;
    onChange?: (value: TValue | null) => void;
}

const Select: <TValue = unknown>(props: ISelectProps<TValue>) => ReactElement<ISelectProps<TValue>> =
    ({ items, initialValue, className, onChange }) => {
        const [selected, setSelected] = useState(initialValue);

        const onChangeHandler = (value: any) => {
            setSelected(value);

            onChange?.(value);
        }

        const defaultLabel = 'Please select ...';
        const selectLabel = selected !== null
            ? items.find(item => item.value === selected)?.label ?? defaultLabel
            : defaultLabel;

        return (
            <Listbox value={selected} onChange={onChangeHandler}>
                {({ open }) => (
                    <div className={clsx('mt-1 relative', className)}>
                        <Listbox.Button
                            className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-main focus:border-main sm:text-sm">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">{selectLabel}</span>
                        </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                static
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                                {items.map((item) => (
                                    <Listbox.Option
                                        key={item.value as unknown as string}
                                        className={({ active }) =>
                                            clsx(
                                                active ? 'text-white bg-main' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={item.value}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                <span
                                                    className={clsx(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                >
                                                    {item.label}
                                                </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={clsx(
                                                            active ? 'text-white' : 'text-main',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                )}
            </Listbox>
        )
    }

export default Select;