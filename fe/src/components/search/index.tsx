import { useFilterContext } from '../../contexts/filters';
import { ChangeEvent, useEffect, useState } from 'react';

export const Search = () => {
  const { setQuery } = useFilterContext();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Wpisz kod produktu"
      value={searchTerm}
      onChange={handleChange}
      className="text-sm font-normal px-3 py-2 bg-white w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};
