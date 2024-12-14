'use client';

import { useState, useActionState } from 'react';
import { CheckIcon, SearchIcon } from 'lucide-react';
import { updateSelectedNames } from '@/app/actions';

const data = await fetch('/osszesffi.txt');
const text = await data.text();
const names = text
  .split('\n')
  .map((name, index) => ({ id: index + 1, name: name.trim() }));

type BabyName = {
  id: number;
  name: string;
};

export default function BabyNameSelector() {
  const [babyNames] = useState<BabyName[]>(names);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNames, setSelectedNames] = useState<number[]>([]);
  const [formState, formAction] = useActionState(updateSelectedNames, {
    selectedNames: [],
  });

  const toggleName = (id: number) => {
    setSelectedNames((prev) =>
      prev.includes(id) ? prev.filter((nameId) => nameId !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedNames([]);
  };

  const filteredBabyNames = babyNames.filter((baby) =>
    baby.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='w-full'>
      <div className='p-6 border-b'>
        <h1 className='text-3xl font-bold mb-4 text-center'>
          Baby Name Selector
        </h1>
        <div className='relative max-w-md mx-auto'>
          <div className='relative max-w-md mx-auto'>
            <label
              htmlFor='search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='search'
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                placeholder='Search names...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type='submit'
                className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
      <div className='overflow-y-auto p-4 max-h-svh grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4'>
              {filteredBabyNames.map((baby) => (
                <div
                  key={baby.id}
                  className='bg-muted rounded-md p-2 hover:bg-muted/80 transition-colors duration-150 ease-in-out'
                >
                  <label className='flex items-center space-x-3 w-full cursor-pointer'>
                    <div className='relative'>
                      <input
                        type='checkbox'
                        className='sr-only peer'
                        checked={selectedNames.includes(baby.id)}
                        onChange={() => toggleName(baby.id)}
                      />
                      <div className='w-6 h-6 border-2 border-muted-foreground rounded-md peer-checked:bg-primary peer-checked:border-primary transition-colors duration-150 ease-in-out'></div>
                      <CheckIcon className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-foreground w-4 h-4 hidden peer-checked:block' />
                    </div>
                    <span className='text-lg'>{baby.name}</span>
                  </label>
                </div>
              ))}
            </div>
        <div className='flex-1 grid grid-cols-2 gap-4 items-start justify-items-center p-4 auto-rows-max'>
          {selectedNames.map((id) => {
            const selectedName = babyNames.find((baby) => baby.id === id);
            return (
              <div key={id}>
                <span
                className='bg-blue-100 text-blue-800 text-lg font-medium me-2 px-3 py-1 rounded dark:bg-blue-900 dark:text-blue-300'
              >
                {selectedName?.name}
              </span>
              </div>
            );
          })}
        </div>
        
      </div>
      <div className='p-4 border-t bg-muted/50 flex justify-between items-center'>
            <p className='text-sm text-muted-foreground'>
              Selected: {selectedNames.length} / {babyNames.length}
            </p>
            <form action={formAction}>
              <input
                type='hidden'
                name='selectedNames'
                value={JSON.stringify(selectedNames)}
              />
              <div className='flex gap-4'>
                <button type='submit'>Save Selection</button>
                <button type='button' onClick={clearSelection}>
                  Clear Selection
                </button>
              </div>
            </form>
          </div>
    </div>
  );
}
