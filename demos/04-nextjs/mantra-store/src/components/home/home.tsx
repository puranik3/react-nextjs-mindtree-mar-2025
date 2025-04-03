import Image from "next/image";

interface Props {
  images: { img: string, title: string }[];
}

export default function Home( { images } : Props ) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-7">
            {/* Image Grid */}
            <div>
                <div className="grid grid-cols-3 gap-4">
                    {images.map((item) => (
                        <div key={item.img} className="relative w-full h-44">
                            <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                                sizes="(max-width: 768px) 33vw, 17vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-1">
                <h1 className="text-3xl font-semibold mb-2">Mantra</h1>
                <h2 className="text-xl font-medium mb-6">The Honest Store</h2>
                <p className="text-base leading-relaxed">
                    If you cannot find what you are looking for here, it is
                    likely not a thing! If you find it elsewhere at a lesser
                    price, we will match the price for you!!
                </p>
            </div>
        </div>
    );
}