import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4&status=approved');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4&status=approved');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4&status=approved');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className='flex flex-col gap-8 p-24 px-4 max-w-5xl mx-auto'>
        <h1 className='text-gray-800 font-extrabold text-4xl lg:text-6xl leading-tight text-center'>
          Discover Your Next <span className='text-blue-500'>Ideal</span>
          <br />
          Home with Confidence
        </h1>
        <p className='text-gray-600 text-sm sm:text-base text-center'>
          Rent Ease is your ultimate destination to find the perfect place to
          live. With a vast selection of properties, we make your search
          effortless and enjoyable.
        </p>
        <div className='flex justify-center'>
          <Link
            to={'/search'}
            className='bg-blue-500 text-white text-base font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200'
          >
            Let's Get Started...
          </Link>
        </div>
      </div>

      {/* Swiper Section */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center/cover no-repeat`,
                }}
                className='h-[500px] rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing Results */}
      <div className='max-w-5xl mx-auto p-4 flex flex-col gap-10 my-12'>
        {offerListings && offerListings.length > 0 && (
          <div>
            <h2 className='text-3xl font-semibold text-gray-700'>Recent Offers</h2>
            <Link className='text-sm text-blue-500 hover:underline' to={'/search?offer=true'}>
              Explore More Offers
            </Link>
            <div className='flex flex-wrap gap-6 mt-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <h2 className='text-3xl font-semibold text-gray-700'>Recent Places for Rent</h2>
            <Link className='text-sm text-blue-500 hover:underline' to={'/search?type=rent'}>
              Explore More Houses for Rent
            </Link>
            <div className='flex flex-wrap gap-6 mt-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <h2 className='text-3xl font-semibold text-gray-700'>Recent Places for Sale</h2>
            <Link className='text-sm text-blue-500 hover:underline' to={'/search?type=sale'}>
              Explore More Houses for Sale
            </Link>
            <div className='flex flex-wrap gap-6 mt-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
