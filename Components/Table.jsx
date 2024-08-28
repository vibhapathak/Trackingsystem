import React from 'react';

export default ({ setCreateSipmentModel, allShipmentsdata }) => {
  // Function to convert time
  const convertTime = (time) => {
    const newTime = new Date(time);
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
    return dateTime;
  };

  console.log(allShipmentsdata);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className="text-gray-600 mt-2">
            Tracking Made Easier.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setCreateSipmentModel(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            ADD TRACK
          </button>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-hidden">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">SENDER</th>
              <th className="py-3 px-6">RECEIVER</th>
              <th className="py-3 px-6">PICKUP TIME</th>
              <th className="py-3 px-6">DISTANCE</th>
              <th className="py-3 px-6">PRICE</th>
              <th className="py-3 px-6">DELIVERY TIME</th>
              <th className="py-3 px-6">PAID</th>
              <th className="py-3 px-6">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {allShipmentsdata.map((shipment, index) => (
              <tr key={index}>
                <td className="py-3 px-6">{shipment.sender}</td>
                <td className="py-3 px-6">{shipment.receiver}</td>
                <td className="py-3 px-6">{convertTime(shipment.pickupTime)}</td>
                <td className="py-3 px-6">{shipment.distance}</td>
                <td className="py-3 px-6">{shipment.price}</td>
                <td className="py-3 px-6">{convertTime(shipment.deliveryTime)}</td>
                <td className="py-3 px-6">{shipment.paid ? 'Yes' : 'No'}</td>
                <td className="py-3 px-6">{shipment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
