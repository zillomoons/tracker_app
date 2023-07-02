const API = 'https://jsonplaceholder.typicode.com/posts';

export async function getAllPosts() {
  const res = await fetch(API);
  if(!res.ok) throw new Error('Unable to fetch posts.')
  return res.json();
}

export async function getPostById(id: string) {
  const res = await fetch(`${API}/${id}`);
  if(!res.ok) throw new Error('Unable to fetch post.')
  return res.json();
}

export async function getPostsBySearch(search:string) {
  const res = await fetch(`${API}?q=${search}`);
  if(!res.ok) throw new Error('Unable to fetch posts.')
  return res.json();
}