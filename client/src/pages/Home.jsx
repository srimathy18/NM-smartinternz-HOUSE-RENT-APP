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
        const res = await fetch('/api/listing/get?offer=true&limit=4');
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
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className='h-full'>
      {/* top */}
      <div className='flex flex-col items-center gap-6 p-28 px-3 max-w-6xl mx-auto text-center'>
        <h1 className='text-purple-700 font-bold text-3xl lg:text-6xl'>
          Discover your ideal <span className='text-pink-500'>space</span>
          <br />
          effortlessly.
        </h1>
        <div className='text-green-600 text-sm sm:text-lg'>
          Nestify is your ultimate destination for finding the perfect place to call home,
          <br />
          with a diverse selection of properties tailored to your needs.
        </div>
        <Link
          to={'/search'}
          className='text-sm sm:text-md text-blue-500 font-bold hover:underline hover:text-blue-700'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 text-center'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-orange-600'>Recent offers</h2>
              <Link className='text-sm text-blue-500 hover:underline hover:text-blue-700' to={'/search?offer=true'}>
                Explore more Offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4 justify-center'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-teal-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-500 hover:underline hover:text-blue-700' to={'/search?type=rent'}>
                Explore more Houses for Rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4 justify-center'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-indigo-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-500 hover:underline hover:text-blue-700' to={'/search?type=sale'}>
                Explore more Houses for Sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4 justify-center'>
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
