"use client"

import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <li>
      <button onClick={() => signIn()} className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md">Sign In</button>
    </li>
  )
}