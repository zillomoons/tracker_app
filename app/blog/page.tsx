import { PostSearch } from '@/components/PostSearch';
import Posts from '@/components/Posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Habit Tracker App',
  description: 'Generated by create next app',
};

export const revalidate = 60;

export default async function Blog() {
  return (
    <>
      <h1>Blog posts</h1>
      <PostSearch />
      <Posts />
    </>
  );
}
