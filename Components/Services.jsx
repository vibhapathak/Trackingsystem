import Image from "next/image";
import images from "../Images/index";

export default ({
    setOpenProfile,
    setCompleteModal,
    setGetModel,
    setStartModal,
}) => {
    const team = [
        { avatar: images.compShipment, alt: "Compshipment Image" },
        { avatar: images.getShipment, alt: "Get Shipment Image" },
        { avatar: images.startShipment, alt: "Start Shipment Image" },
        { avatar: images.userProfile, alt: "User Profile Image" },
        { avatar: images.shipCount, alt: "Shipment Count Image" },
        { avatar: images.send, alt: "Send Shipment Image" },
    ];

    const openModelBox = (text) => {
        if (text === 1) {
            setCompleteModal(true);
        } else if (text === 2) {
            setGetModel(true);
        } else if (text === 3) {
            setStartModal(true);
        } else if (text === 4) {
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
                                    className="relative w-full h-60 sm:h-52 md:h-56"
                                >
                                    <Image
                                        src={item.avatar}
                                        alt={item.alt}
                                        layout="fill" // Use fill for responsive sizing
                                        objectFit="cover" // Ensure the image covers the container
                                        className="shadow-md rounded-xl"
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
