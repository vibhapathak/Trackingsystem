import React, { useState } from 'react';

export default function CreateShipmentModal({
  setCreateShipmentModel,
  createShipmentModel,
  createShipment,
}) {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log("Error creating item", error);
    }
  };

  return createShipmentModel ? (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div
        className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setCreateShipmentModel(false)}
      />
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button
              className='p-2 text-gray-400 rounded-md hover:bg-gray-100'
              onClick={() => setCreateShipmentModel(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M6.293 4.293a1 1 0 011.414 0L10 5.586l2.293-2.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 9 6.293 6.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg font-medium text-gray-800'>
              Track Product, Create Shipment
            </h4>
            <p className='text-[15px] text-gray-600'>
              At your doorstep, find what you booked!
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='relative mt-3'>
                <input
                  type='text'
                  placeholder='Receiver'
                  className='w-full pl-5 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
              <div className='relative mt-3'>
                <input
                  type='datetime-local'
                  placeholder='Pickup Time'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className='relative mt-3'>
                <input
                  type='number'
                  placeholder='Distance'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      distance: e.target.value,
                    })
                  }
                />
              </div>
              <div className='relative mt-3'>
                <input
                  type='number'
                  placeholder='Price'
                  className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type='button'
                onClick={createItem}
                className='block w-full mt-3 px-4 py-3 font-medium text-sm text-center text-white bg-indigo-600 outline-none border hover:border-indigo-500 active:bg-indigo-700 shadow-sm rounded-lg ring-offset-2 ring-indigo-600'
              >
                Create Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
