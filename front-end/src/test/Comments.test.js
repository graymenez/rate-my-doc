import { render, screen } from "@testing-library/react";
import Comments from "../Comments";

test("renders Comments Component", () => {
  let test_physician = {
    id: "testId",
    first_name: "testFirstName",
    last_name: "testLastName",
    title: "testTitle",
    specialy: "testSpecialty",
    located: "testLocated",
    street_name: "testStreetName",
    city: "testCity",
    image_url: "testImageUrl",
    phone: "testPhone",
    physician_bio: "testPhysicianBio",
    rating: "testRating",
  };
  render(<Comments currPhysician={test_physician} />);
  expect();
});
