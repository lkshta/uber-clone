import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      {" "}
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300 "></i>
      </h5>
      <h3 className="text-2xl font-semibold ">Finish this Ride</h3>
      <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-300 rounded-lg">
        <div className="flex items-center justify-start gap-3 ">
          <img
            className="h-12 w-10 rounded-full object-cover "
            src="https://i.pinimg.com/736x/9b/e7/bf/9be7bf0a773fe4dfcbcb27ce7dbcf7a3.jpg"
            alt="captain img"
          />
          <h2 className="text-lg font-medium ">Harshi Pateliya</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km</h5>
      </div>
      <div className="flex gap-2 items-center justify-between flex-col ">
        <div className="w-full mt-5">
          <div className="flex gap-5 p-3 border-b-2 items-center ">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Iffco Chowk, Gurgaon
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-3 border-b-2 items-center ">
            <i className="text-lg ri-map-2-fill"></i>
            <div>
              <h3 className="text-lg fnt-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Iffco Chowk, Gurgaon
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-3 items-center ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">Rs. 193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
        
            <Link
              to="/captain-home"
              onClick={() => {}}
              className="w-full mt-10 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Finish Ride
            </Link>

        </div>
      </div>
    </div>
  );
};

export default FinishRide;
