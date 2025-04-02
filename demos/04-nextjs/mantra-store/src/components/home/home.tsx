import Image from "next/image"

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-7">
      {/* Image Grid */}
      <div>
        <div className="grid grid-cols-3 gap-4">
          {itemData.map((item) => (
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
      <div className="flex items-center justify-center text-2xl font-semibold">
        Mantra
      </div>
    </div>
  )
}

const itemData = [
  {
    img: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    img: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    title: "White Gold Plated Princess",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
  },
  {
    img: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  },
  {
    img: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
]