import Image from "next/image";
import Icon from "../../public/notes-icon.svg";

export default function SubscribeBanner() {
  return (
    <div className="w-full bg-stone-300 p-3 flex justify-around items-center rounded-lg">
      <div className="w-[75%] p-3">
        <div className="font-semibold tracking-tighter">
          Getting unlimited access to everything in Reader
        </div>
        <div className="text-sm font-light">
          Plans startin at less than $1/week
        </div>
        <div className="w-[200px] bg-primary p-2 mt-4 text-sm rounded-lg text-center font-medium shadow-md">
          Get Unlimited Access
        </div>
      </div>
      <Image src={Icon} className="w-20" alt="" />
    </div>
  );
}
