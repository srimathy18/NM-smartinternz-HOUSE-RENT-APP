import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls && listing.imageUrls.length > 0
              ? listing.imageUrls[0]
              : 'https://assets-news.housing.com/news/wp-content/uploads/2022/01/10145854/most-beautiful-houses2.png'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name || 'No Title Available'}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address || 'No Address Available'}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description || 'No Description Available'}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            ₹
            {listing.offer
              ? listing.discountPrice?.toLocaleString('en-IN')
              : listing.regularPrice?.toLocaleString('en-IN')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              <p>{listing.bedrooms ? `${listing.bedrooms} BHK` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
