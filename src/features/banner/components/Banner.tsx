import Image from "next/image";
import banner from "@/src/assets/image/banner.png";

export default function Banner() {
  return (
    <div className="hidden lg:flex relative h-[284px] w-full">
      <Image className=" object-cover" src={banner} alt="بنر" fill />
    </div>
  );
}
