'use client'
import axios from 'axios'
import AddPost from './components/addPost'
import { useQuery } from '@tanstack/react-query'
import Post from "./components/Post"
import { PostsType } from './types/Posts'

const allPosts = async() => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}


export default function Home() {
  const {data, error, isLoading} = useQuery<PostsType[]>({queryFn: allPosts, queryKey: ["posts"]})

  if(error) return "Can't load 🥲"
  if(isLoading) return "loading..."
  console.log(data)
  return (
    <main >
      
      <AddPost />
      {data?.map((post) => (
        <Post 
          comments={post.comments}
          key={post.id} 
          name={post.user.name} 
          avatar={post.user.image} 
          postTitle={post.title} 
          id={post.id}
        />
      ))}
    </main>
  )
}
