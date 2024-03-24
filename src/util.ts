export const extractNumbers = (str: string) =>
  str
    ?.split("")
    .filter((e) => !isNaN(parseInt(e)))
    .join("");

export const isPhoneNumber = (str: string) => extractNumbers(str).length > 1;
