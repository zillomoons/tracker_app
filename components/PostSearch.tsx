'use client';
import { FormEventHandler, useState } from 'react';

export const PostSearch = () => {
  const [search, setSearch] = useState('');
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='search'
        placeholder='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
};
