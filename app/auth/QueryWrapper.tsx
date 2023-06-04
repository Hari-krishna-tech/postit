'use client'
import { Toaster } from 'react-hot-toast'
import {ReactNode} from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
interface Props {
    children? : ReactNode
}
const queryClient = new QueryClient()

const QueryWrapper = ({children}: Props) => (

    <QueryClientProvider client={queryClient}>
      <Toaster />
        {children}
    </QueryClientProvider>
)

export default QueryWrapper