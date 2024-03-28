// app/error.tsx
"use client";
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='absolute w-full h-full flex items-center justify-center text-white group'>
      <div
        className='absolute -translate-y-20 sm:-translate-x-36 sm:-translate-y-12 border-2 bg-red-500/50 border-red-600 rounded-xl backdrop-blur-sm z-10 p-2 shadow-lg
         transition duration-300 sm:group-hover:-translate-x-28 group/nf'
      >
        <h1 className='font-bold text-3xl transition duration-300 group-hover/nf:blur-sm'>Error</h1>
        <h1 className='absolute -translate-y-9 px-10 transition-all duration-600 font-bold text-3xl opacity-0 group-hover/nf:opacity-100'>{error.name}</h1>
      </div>

      <div className='bg-red-500/50 p-4 px-8 rounded-xl border-2 border-red-600 flex-row backdrop-blur-sm transition duration-300 group-hover:skew-x-6'>
        <p>{error.message}</p>
      </div>

      <div
        className='absolute translate-y-20 sm:translate-x-36 sm:translate-y-10 border-2 bg-red-500/50 border-red-600 rounded-xl backdrop-blur-sm z-10 p-2 shadow-lg
         transition duration-300 group-hover:translate-x-32 hover:backdrop-blur-lg hover:underline hover:bg-red-500/40 hover:border-red-700 hover:-skew-x-6'
      >
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}