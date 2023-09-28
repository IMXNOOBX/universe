// PaginationControls.jsx
import { Link } from 'react-router-dom';
import Forward from '../assets/icons8-forward-48.png'
import Back from '../assets/icons8-back-48.png'

function PaginationControls({ currentPage, totalPages, className }) {
  return (
    <div className={className}>
        
      {currentPage > 1 && (
        <div className='p-2  rounded-lg group'>
            <Link to={`/projects/${currentPage - 1}`}>
                <img className='w-10 group-hover:scale-110 transition-all ease-in-out delay-150 duration-300 shadow-sm' src={Back} alt="Back" />
            </Link>
        </div>
      )}

      {currentPage < totalPages && (
        <div className='p-2 rounded-lg ml-auto group'>
            <Link to={`/projects/${currentPage + 1}`}>
                <img className='w-10 group-hover:scale-110 transition-all ease-in-out delay-150 duration-300 shadow-sm' src={Forward} alt="Forward" />
            </Link>
        </div>
      )}
    </div>
  );
}

export default PaginationControls;
