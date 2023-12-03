import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { marked } from 'marked';

import config from '../config/config';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import '../style/markdown-styles.css'; // Import your custom CSS file

function About() {
	const [markdown, setMarkdown] = useState('');

	useEffect(() => {
		// Load and read the aboutme.md file
		fetch(`https://raw.githubusercontent.com/${config.gh.account}/${config.gh.account}/main/README.md`)
		  .then((response) => { if (response.status === 200) return response.text(); })
		  .then((text) => {
			if (text?.length !== 0) 
			  setMarkdown(text);
		  })
		  .catch((error) => console.error('Error loading Markdown file:', error));
	  }, []);

	const renderer = {
		h1({ children }) {
			return <h1 style={{ fontSize: '50px', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>{children}</h1>;
		},
		h2({ children }) {
			return <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>{children}</h2>;
		},
		h3({ children }) {
			return <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>{children}</h3>;
		},
		a({ node, href, children, ...props }) {
			return (
				<a href={href.replaceAll(/&amp;/g, '&')} style={{ color: '#2f81f7' }} {...props}>
					{children}
				</a>
			);
		},
		img({ src, alt, title, ...props }) {
			return (
			  <img
				src={src.replaceAll(/&amp;/g, '&')}
				alt={alt}
				title={title}
				// Add any other attributes you want here
				{...props}
			  />
			);
		  },
		code: (props) => {
			const { children, className } = props;
			// Extract language from className if available
			const match = /language-(\w+)/.exec(className || '');
			return match ? (
				<SyntaxHighlighter
					{...props}
					style={oneDark}
					language={match[1]}
					PreTag="div"
				/>
			) : (
				<code {...props} className={className}>
					{children}
				</code>
			);
		},
		html: (props) => {
			console.log(props.value)
			return <div dangerouslySetInnerHTML={{ __html: props.value }} />;
		},
	};

	marked.use({ renderer });

	return (
		<div className="min-h-screen overflow-auto transition-all bg-zinc-800 protfolio-background relative">
			<div className="absolute inset-0 bg-black opacity-20 h-full"></div>

			<div className="inset-0 mb-20">
				<NavBar className="backdrop-blur-lg mx-4 lg:mx-auto mt-6 max-w-5xl rounded-xl bg-zinc-900/70" currentPage={2} />

				<div className="max-w-6xl mx-auto p-4">
					<div className="my-4 shadow-sm backdrop-blur-lg p-4 rounded-xl bg-zinc-900/40 text-white">

						{/* <div className="text-white text-4xl font-semibold mb-4">About Me</div> */}

						{/* Render Markdown content */}
						{/* <ReactMarkdown
							remarkPlugins={[remarkGfm]}
							// rehypePlugins={[rehypeRaw]}
							components={renderers} // Use custom renderers for headings
						>
							{markdown}
						</ReactMarkdown> */}
						<div dangerouslySetInnerHTML={{__html: marked.parse(markdown)}}/>

						{!markdown && (<>
							<div className='flex flex-col h-96 backdrop-blur-sm rounded-lg'>
								<div className='text-white text-center mt-20 p-4 font-bold'>
									The aboutme.md hasnt beeen filled by the owner, Here is a cool spinner instead
								</div>
								<div className='mx-auto'>
								<Triangle
									height="150"
									width="150"
									color="#33FF80"
									ariaLabel="triangle-loading"
									wrapperStyle={{}}
									wrapperClassName=""
									visible={true}
								/>
								</div>
								<div className="p-2 px-4 mt-4 mx-auto bg-indigo-800 rounded-lg text-white font-medium">
									<Link to={`/`}>Go Home</Link>
								</div>
							</div>
						</>)}
					</div>
				</div>
			</div>
			<Footer className="absolute bottom-0 bg-zinc-900/70 w-full mb-0 mt-4" />
		</div>
	);
}

export default About;
