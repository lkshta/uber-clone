import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-300 "></i>
      </h5>
      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize ">
            {props.ride?.captain.fullname.firstname +
              " " +
              props.ride?.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-between flex-col ">
        <div className="w-full mt-5">
          <div className="flex gap-5 p-3 border-b-2 items-center ">
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-3 border-b-2 items-center ">
            <i className="text-lg ri-map-2-fill"></i>
            <div>
              <h3 className="text-lg fnt-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex gap-5 p-3 items-center ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                &#8377;{" "}
                {props.ride?.fare[props.ride?.captain.vehicle.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
