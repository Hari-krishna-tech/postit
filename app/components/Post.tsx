'use client'
import Image from "next/image"
import Link from "next/link"

export default function post({avatar, name, postTitle,id,comments}) {
    return (
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div>
                <p className="break-all">{postTitle}</p>
            </div>
            <div className="flex gap-4 cursor-pointer items-center">
                <Link href={`/page/${id}`}>
                    <p className="test-sm font-bold text-gray-700">{comments.length} Comment</p>
                </Link>
            </div>
        </div>
    )
}