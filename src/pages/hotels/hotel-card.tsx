import { Rating } from "../../components/rating";
import type { Hotel } from "../../types";
import { extractNumbers, isPhoneNumber } from "../../util";

export const HotelCard = ({
  id,
  name,
  address,
  city,
  state,
  country_code,
  hotel_rating,
  phone_number,
  website,
}: Hotel) => {
  return (
    <div className="flex flex-col gap-y-2 z-50 rounded-lg font-medium font-sans text-sm p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100">
      <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {website ? (
          <a href={website} target="__blank" className="hover:underline">
            {name}
          </a>
        ) : (
          <span>{name}</span>
        )}
      </h4>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {[address, city, state, country_code].filter((e) => e).join(", ")}
      </p>
      <Rating rate={hotel_rating || 0} />
      {phone_number && isPhoneNumber(phone_number) && (
        <div className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
          <a href={`tel:+${extractNumbers(phone_number)}`}>{phone_number}</a>
        </div>
      )}
    </div>
  );
};
