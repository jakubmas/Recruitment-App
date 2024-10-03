import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useFilterContext, FiltersContextType } from '../../contexts/filters';

interface FilterOption {
  value: string | number;
  label: string;
}

interface FilterSection {
  id: keyof FiltersContextType['filters'];
  name: string;
  options: FilterOption[];
}

const filtersData: FilterSection[] = [
  {
    id: 'sort',
    name: 'Sortuj',
    options: [
      { value: 'price', label: 'Cena' },
      { value: 'capacity', label: 'Pojemność' },
    ],
  },
  {
    id: 'feature',
    name: 'Funkcje',
    options: [
      { value: 'Panel AI Control', label: 'Panel AI Control' },
      { value: 'Silnik inwerterowy', label: 'Silnik inwerterowy' },
      { value: 'Wyświetlacz elektroniczny', label: 'Wyświetlacz elektroniczny' },
    ],
  },
  {
    id: 'energyClass',
    name: 'Klasa energetyczna',
    options: [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
    ],
  },
  {
    id: 'capacity',
    name: 'Pojemność',
    options: [
      { value: 8, label: '8 kg' },
      { value: 9, label: '9 kg' },
      { value: 10.5, label: '10.5 kg' },
    ],
  },
];

export const Filters = () => {
  const { filters, setFilters } = useFilterContext();

  const handleCheckboxChange = (
    sectionId: keyof FiltersContextType['filters'],
    value: string | number
  ) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[sectionId] as (string | number)[];
      if (currentValues.includes(value)) {
        return {
          ...prevFilters,
          [sectionId]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prevFilters,
          [sectionId]: [...currentValues, value],
        };
      }
    });
  };

  const handleRadioChange = (
    sectionId: keyof FiltersContextType['filters'],
    value: string | number
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [sectionId]: value,
    }));
  };

  return (
    <form className="space-y-6">
      {filtersData.map((section) => (
        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full text-sm font-medium text-left text-gray-900">
                <span>{section.name}</span>
                <ChevronDownIcon
                  className={`${open ? '-rotate-180' : 'rotate-0'} h-5 w-5 transform`}
                  aria-hidden="true"
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <div className="space-y-4">
                  {section.options.map((option) => (
                    <div key={option.value} className="flex items-center">
                      {section.id === 'sort' ? (
                        <input
                          id={`${section.id}-${option.value}`}
                          name={section.id}
                          type="radio"
                          checked={filters[section.id] === option.value}
                          onChange={() => handleRadioChange(section.id, option.value)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={`${section.id}-${option.value}`}
                          name={section.id}
                          type="checkbox"
                          checked={(filters[section.id] as (string | number)[]).includes(
                            option.value
                          )}
                          onChange={() => handleCheckboxChange(section.id, option.value)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      )}
                      <label
                        htmlFor={`${section.id}-${option.value}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};
