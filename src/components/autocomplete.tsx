import * as React from "react";
import {
  useAutocomplete,
  UseAutocompleteProps,
} from "@mui/base/useAutocomplete";
import { Button } from "@mui/base/Button";
import { Popper } from "@mui/base/Popper";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearIcon from "@mui/icons-material/Clear";
import clsx from "clsx";

type Option = { id: number; label: string };

export const Autocomplete = React.forwardRef(function Autocomplete(
  props: UseAutocompleteProps<Option | undefined, false, false, false> & {
    autoFocus?: boolean;
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    options,
    isOptionEqualToValue,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete<Option | undefined>({
    ...props,
    getOptionLabel: (o) => o?.label || "",
    componentName: "BaseAutocompleteIntroduction",
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <React.Fragment>
      <div
        {...getRootProps(other)}
        ref={rootRef}
        className={clsx(
          "flex gap-[5px] pr-[5px] overflow-hidden w-80 rounded-lg bg-white dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-400 focus-visible:outline-0 shadow-[0_2px_4px_rgb(0_0_0_/_0.05)] dark:shadow-[0_2px_4px_rgb(0_0_0_/_0.5)]",
          !focused &&
            "shadow-[0_2px_2px_transparent] shadow-gray-50 dark:shadow-gray-900",
          focused &&
            "border-violet-400 dark:border-violet-400 shadow-[0_0_0_3px_transparent] shadow-violet-200 dark:shadow-violet-500"
        )}
      >
        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={props.autoFocus}
          {...getInputProps()}
          className="text-sm leading-[1.5] text-gray-900 dark:text-gray-300 bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto"
        />
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-violet-100 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            <ClearIcon className="translate-y-[2px] scale-90" />
          </Button>
        )}
        <Button
          {...getPopupIndicatorProps()}
          className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-violet-100 dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          <ArrowDropDownIcon
            className={clsx("translate-y-[2px]", popupOpen && "rotate-180")}
          />
        </Button>
      </div>
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: "relative z-[1001] w-80", // z-index: 1001 is needed to override ComponentPageTabs with z-index: 1000
            },
          }}
          modifiers={[
            { name: "flip", enabled: false },
            { name: "preventOverflow", enabled: false },
          ]}
        >
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 my-3 mx-0 min-w-[320px] rounded-xl overflow-auto outline-0 max-h-[300px] z-[1] bg-white dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-200 shadow-[0_4px_30px_transparent] shadow-gray-200 dark:shadow-gray-900"
          >
            {(groupedOptions as Option[]).map((option, index) => {
              const optionProps = getOptionProps({ option, index });
              //@ts-expect-error
              optionProps.key = optionProps.id + optionProps.key;

              return (
                <li
                  {...optionProps}
                  className="list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer aria-selected:bg-violet-100 dark:aria-selected:bg-violet-900 aria-selected:text-violet-900 dark:aria-selected:text-violet-100 ui-focused:bg-gray-100 dark:ui-focused:bg-gray-700 ui-focus-visible:bg-gray-100 dark:ui-focus-visible:bg-gray-800 ui-focused:text-gray-900 dark:ui-focused:text-gray-300 ui-focus-visible:text-gray-900 dark:ui-focus-visible:text-gray-300 ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-violet-200 dark:ui-focus-visible:shadow-violet-500 ui-focused:aria-selected:bg-violet-100 dark:ui-focused:aria-selected:bg-violet-900 ui-focus-visible:aria-selected:bg-violet-100 dark:ui-focus-visible:aria-selected:bg-violet-900 ui-focused:aria-selected:text-violet-900 dark:ui-focused:aria-selected:text-violet-100 ui-focus-visible:aria-selected:text-violet-900 dark:ui-focus-visible:aria-selected:text-violet-100"
                >
                  {option.label}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="list-none p-2 cursor-default">No results</li>
            )}
          </ul>
        </Popper>
      )}
    </React.Fragment>
  );
});
