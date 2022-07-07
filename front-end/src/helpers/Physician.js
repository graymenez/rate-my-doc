import RmdApi from "../api";

// A function that returns a physician by name and a physician rating by the physician id then sets currentPhysician and rating

const getPhysician = async (
  setCurrentPhysician,
  setRating,
  setRatingIsLoaded,
  name
) => {
  let res = await RmdApi.getPhysicianByName(name);
  let ratingRes = await RmdApi.getPhysicianRatingById(res.id);
  setCurrentPhysician(res);
  setRating(ratingRes);
  setRatingIsLoaded(true);
};
export default getPhysician;
