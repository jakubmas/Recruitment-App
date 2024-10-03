import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiltersContextType, useFilterContext } from '../../contexts/filters';
import { ChevronDown } from 'react-feather';

export interface DropdownOption {
  name: string | number;
  title?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  filter: keyof FiltersContextType['filters'];
}

export const Dropdown = ({ options, filter }: DropdownProps) => {
  const { setFilters, filters } = useFilterContext();
  const [selected, setSelected] = useState<DropdownOption>({
    name: filters[filter] as string | number,
  });

  const handleChange = (option: DropdownOption) => {
    setSelected(option);
    setFilters({ ...filters, [filter]: option.name });
  };

  const selectedTitle = selected.title || selected.name || 'Pokaż wszystkie';

  return (
    <div>
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
            <span className="block truncate">{selectedTitle}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white text-base shadow-lg focus:outline-none sm:text-sm">
              <Listbox.Option
                key="all"
                value={{ name: '' }}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${active ? 'bg-gray-100' : ''}`
                }
              >
                Wszystkie
              </Listbox.Option>
              {options.map((option) => (
                <Listbox.Option
                  key={option.name.toString()}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-gray-100' : ''}`
                  }
                >
                  {option.title ?? option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
