'use client'

//import { PostType } from "@/app/types/Post"
import Post from "@/app/components/Post"
import AddComment from "@/app/components/AddComment"
import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"



const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

type URL = {
    params: {
        slug: string
    }
}


export default function PostDetail(url:URL) {
    const {data, isLoading} = useQuery({
        queryKey: ["detail-post"], queryFn:()=> fetchDetails(url.params.slug)})
        if(isLoading) return "loading.."
        console.log(data)
    return (
        <div>
            <Post id={data.id} name={data.user.name} avatar={data.user.image} postTitle={data.title} comments={data.comments}/>
            <AddComment id={data?.id}/>
            {data.comments.map((comment:any)=> (
                <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
                    <div className="flex items-center gap-2">
                        <Image
                            width={24}
                            height={24}
                            src={comment.user?.image}
                            alt="avatar"
                        />
                        <h3 className="font-bold">{comment?.user?.name}</h3>
                        <h2 className="text-sm">{comment.createdAt}</h2>
                    </div>
                    <div className="py-2">{comment.title}</div>
                </div>
            ))}
        </div>
    )
}