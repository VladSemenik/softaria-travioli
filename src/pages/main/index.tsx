import { Autocomplete } from "../../components/autocomplete";
import { useGetDestinationsQuery } from "./api";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useMemo } from "react";
import type { SearchQuery } from "./types";
import { useSelector, useDispatch } from "react-redux";
import type { AppState } from "../../store";
import { storeSearch } from "./store";

const TODAY_DATE = new Date().toLocaleDateString("fr-ca");

const MainPage = () => {
  const searchValues = useSelector((state: AppState) => state.search);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    clearErrors,
  } = useForm<SearchQuery>({
    mode: "onBlur",
    defaultValues: searchValues,
  });
  const { data: listOfDestinations } = useGetDestinationsQuery();
  const history = useHistory();

  const mappedListOfDestinations = useMemo(() => {
    return (
      listOfDestinations?.map((e) => ({
        id: e.id,
        label: e.name,
      })) || []
    );
  }, [listOfDestinations]);

  const onSubmit = useCallback(
    (data: SearchQuery) => {
      dispatch(storeSearch(data));
      history.push(`/hotels`);
    },
    [dispatch, history]
  );

  return (
    <div className="flex flex-col items-center gap-y-12">
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Search
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <label htmlFor="destination" className="text-black text-sm">
          Destination
        </label>
        <Controller
          name="dest"
          control={control}
          defaultValue={mappedListOfDestinations[0]}
          rules={{ required: "Destination is required" }}
          render={({ field }) => {
            return (
              <Autocomplete
                {...field}
                autoFocus
                id="destination"
                options={mappedListOfDestinations}
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
                onChange={(e, v) => {
                  v && setValue("dest", v);
                  clearErrors("dest");
                }}
              />
            );
          }}
        />
        {formState.errors.dest && (
          <p className="text-red-600 text-xs">
            {formState.errors?.dest?.message}
          </p>
        )}

        <label htmlFor="check-in" className="text-black text-sm">
          Check in
        </label>
        <input
          type="date"
          min={TODAY_DATE}
          max={watch("checkOut")}
          {...register("checkIn", {
            required: "Date is required",
          })}
          id="check-in"
          className="w-80 text-sm font-normal font-sans leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple dark:outline-purple-600 focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
        />
        {formState.errors.checkIn && (
          <p className="text-red-600 text-xs">
            {formState.errors?.checkIn?.message}
          </p>
        )}

        <label htmlFor="check-out" className="text-black text-sm">
          Check out
        </label>
        <input
          type="date"
          min={watch("checkIn") || TODAY_DATE}
          {...register("checkOut", { required: "Date is required" })}
          id="check-out"
          className="w-80 text-sm font-normal font-sans leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple dark:outline-purple-600 focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
        />
        {formState.errors.checkOut && (
          <p className="text-red-600 text-xs">
            {formState.errors?.checkOut?.message}
          </p>
        )}

        <label htmlFor="amount-people" className="text-black text-sm">
          Amount of people
        </label>
        <input
          type="number"
          {...register("amountPeople", {
            required: "Amount of people is required",
            min: 1,
          })}
          min={1}
          id="amount-people"
          className="w-80 text-sm font-normal font-sans leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple dark:outline-purple-600 focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-600 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
        />
        {formState.errors.amountPeople && (
          <p className="text-red-600 text-xs">
            {formState.errors?.amountPeople?.message}
          </p>
        )}
        {formState.errors.amountPeople?.type === "min" && (
          <p className="text-red-600 text-xs">Min amount of people is 1</p>
        )}
        <button
          type="submit"
          className="mt-8 cursor-pointer transition text-sm font-sans font-semibold leading-normal bg-violet-500 text-white rounded-lg px-4 py-2 border border-solid border-violet-500 shadow-[0_2px_1px_rgb(45_45_60_/_0.2),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] dark:shadow-[0_2px_1px_rgb(0_0_0/_0.5),_inset_0_1.5px_1px_#a78bfa,_inset_0_-2px_1px_#7c3aed] hover:bg-violet-600 active:bg-violet-700 active:shadow-none active:scale-[0.99] focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none ui-disabled:text-slate-700 ui-disabled:dark:text-slate-200 ui-disabled:bg-slate-200 ui-disabled:dark:bg-slate-700 ui-disabled:cursor-default ui-disabled:shadow-none ui-disabled:dark:shadow-none ui-disabled:hover:bg-slate-200 ui-disabled:hover:dark:bg-slate-700 ui-disabled:border-none"
        >
          Find
        </button>
      </form>
    </div>
  );
};

export default MainPage;
