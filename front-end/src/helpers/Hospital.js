import RmdApi from "../api";

// A function that returns a hospital by name and a hospital rating by the hospital id then sets currentHospital and rating

const getHospital = async (
  setCurrentHospital,
  setRating,
  setRatingIsLoaded,
  name
) => {
  let res = await RmdApi.getHospitalByName(name);
  let ratingRes = await RmdApi.getHospitalRatingById(res.id);
  setCurrentHospital(res);
  setRating(ratingRes);
  setRatingIsLoaded(true);
};

export default getHospital;
