import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Linkto {
    url: string;
    name: string;
}

export default function TimelineCard({ visible, right, title, content, logo, links }: { visible: boolean, right: boolean, title: string, content: string, logo?: string | StaticImageData, links?: Linkto[] }) {
    return (
        <div className='group'>
            <div 
                className={`absolute transition animate-fade-in duration-300 w-1/2 mt-4 rounded-full
                    h-2 from-green-400 to-transparent
                    ${right ? 'right-0 bg-gradient-to-l group-hover:-translate-x-10' : 'left-0 bg-gradient-to-r group-hover:translate-x-10'} 
                    ${visible ? 'delay-1000 animate-fade-in' : 'opacity-0'}
                `}
            />
            <div
                className={`${right ? 'ml-auto' : 'mr-auto'} group/inner bg-zinc-900/50 backdrop-blur-md p-3 rounded-2xl border border-zinc-800 shadow-lg
                                relative overflow-hidden max-w-lg transition duration-300 hover:border-green-400/30`}
                style={{
                    opacity: visible ? 1 : 0.5,
                    pointerEvents: visible ? 'auto' : 'none'
                }}
            >
                {/* Background Shadow */}
                <div
                    className='absolute left-0 top-0 overflow-hidden w-1/2 h-full transition duration-300 
                        bg-gradient-to-r from-green-100/20 to-transparent opacity-0 group-hover/inner:opacity-100'
                />

                {/* Left bar */}
                <div className='absolute h-full top-0 left-0 pl-2 py-2 transition duration-300 group-hover/inner:translate-x-1'>
                    <div className={`w-2 h-full rounded-full transition duration-300 group-hover/inner:bg-green-400 ${visible ? 'bg-green-400/50' : 'bg-gray-500'}`}></div>
                </div>

                {/* Content */}
                <div className='ml-3 transition duration-300 group-hover/inner:translate-x-2'>
                    <div className='flex flex-row items-center transition duration-300 group-hover/inner:-translate-y-2'>
                        <div className="font-bold">{title}</div>
                        {logo &&
                            <Image
                                src={logo}
                                alt={title}
                                className="transition duration-300 ml-auto group-hover/inner:translate-y-0 -translate-y-2 my-auto w-6 h-6 scale-75 rounded-lg overflow-visible drop-shadow-[#000_0px_0px_10px]"
                            />
                        }
                    </div>
                    <div className='pl-2 text-gray-300 overflow-auto max-h-40 shadow-inner shadow-zinc-900 rounded-lg'>
                        {content}
                    </div>
                    <div className='translate-y-1 flex gap-2'>
                        {links &&
                            links.map((link, i) => (
                                <Link 
                                    key={i} 
                                    href={link.url} 
                                    className="text-xs bg-zinc-600/50 px-1 border border-zinc-600 rounded-md 
                                        transition duration-300 hover:border-white hover:bg-zinc-400/50">
                                        {link.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
