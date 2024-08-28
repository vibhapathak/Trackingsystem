import Image from "next/image";
import images from "./Images";

export default ({
    setOpenProfile,
    setCompleteModal,
    setGetModel,
    setStartModal,
}) => {
    const team = [
        { avatar: images.Compshipment, alt: "Compshipment Image" },
        { avatar: images.GetShipment, alt: "Get Shipment Image" },
        { avatar: images.StartShipment, alt: "Start Shipment Image" },
        { avatar: images.UserProfile, alt: "User Profile Image" },
        { avatar: images.ShipmentCount, alt: "Shipment Count Image" },
        { avatar: images.SendShipment, alt: "Send Shipment Image" },
    ];

    const openModelBox = (index) => {
        if (index === 1) {
            setCompleteModal(true);
        } else if (index === 2) {
            setGetModel(true);
        } else if (index === 3) {
            setStartModal(true);
        } else if (index === 4) {
            setOpenProfile(true);
        }
    };

    return (
        <section className="py-0 pb-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {team.map((item, i) => (
                            <li key={i}>
                                <div
                                    onClick={() => openModelBox(i + 1)}
                                    className="w-full h-60 sm:h-52 md:h-56 cursor-pointer"
                                    role="button"
                                    tabIndex={0} // Make the div focusable
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            openModelBox(i + 1);
                                        }
                                    }} // Handle Enter key press
                                >
                                    <Image
                                        src={item.avatar}
                                        alt={item.alt}
                                        layout="fill"
                                        className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
