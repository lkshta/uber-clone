import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300 "></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
      <div className="flex gap-2 items-center justify-between flex-col ">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png"
          alt=""
        />
      </div>
      <div className="w-full mt-5">
        <div className="flex gap-5 p-3 border-b-2 items-center ">
          <i className=" text-lg ri-map-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">Iffco Chowk, Gurgaon</p>
          </div>
        </div>

        <div className="flex gap-5 p-3 border-b-2 items-center ">
          <i className="text-lg ri-map-2-fill"></i>
          <div>
            <h3 className="text-lg fnt-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">Iffco Chowk, Gurgaon</p>
          </div>
        </div>

        <div className="flex gap-5 p-3 items-center ">
          <i className="text-lg ri-map-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Rs. 193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
