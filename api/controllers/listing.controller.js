import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// for deleting listing from show listings button for specific id
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

// editing the listing under show listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// for getting information of specific listing
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Approving the listing (for owner only)
export const approveList = async function (req, res, next) {
  if (req.user && req.user.userType !== "owner") {
    return next(errorHandler(401, "Unauthorized"));
  }
  try {
    const list = await Listing.findByIdAndUpdate(req.query.id, { status: "approved" });
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    console.log("Query ", req.query);

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    let status = req.query.status;

    if (status !== undefined) {
      if (status === "created") status = { $in: ["created"] };
      if (status === "approved") status = { $in: ["approved"] };
      if (status === "rejected") status = { $in: ["rejected"] };
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    console.log({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
      status
    });

    // Get the listings based on filters and sort options
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
      status
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex)
      .lean(); // Converts the documents to plain JavaScript objects

    // Map over listings to add ₹ symbol to price field
    const listingsWithRupee = listings.map(listing => ({
      ...listing,
      price: `₹${listing.price}` // Format price with ₹ symbol
    }));

    return res.status(200).json(listingsWithRupee);
  } catch (error) {
    next(error);
  }
};
