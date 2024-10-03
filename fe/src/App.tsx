import { FiltersProvider } from './contexts/filters';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Filters } from './components/filters';
import { Products } from './components/products';
import { Search } from './components/search';

function App() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <FiltersProvider>
      <main className=" min-h-screen">
        {/* Search Input */}
        <div className="container mx-auto px-4 py-6">
          <Search />
        </div>

        <div className="container mx-auto px-4 lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <Filters />
          </aside>

          {/* Mobile Filters Button */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center"
            >
              <span className="text-sm font-medium text-gray-700">Filtry</span>
              <PlusIcon className="ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Products />
          </div>
        </div>

        {/* Mobile Filters Dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          className="fixed inset-0 z-40 flex lg:hidden"
        >
          <div className="relative ml-auto w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-medium text-gray-900">Filtry</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4">
              <Filters />
            </div>
          </div>
        </Dialog>
      </main>
    </FiltersProvider>
  );
}

export default App;
