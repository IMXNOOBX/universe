// app/not-found.tsx

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='static'>
        <div className='bg-red-500/50 p-4 rounded-xl border-2 border-red-600 flex-row justify-center items-center'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    </div>
  )
}