
export const getTemperatureSettings =  () => {
  if (typeof window !== "undefined") {
    const valueFromStorage = localStorage.getItem("useCelsius");
    let value = true;
    if (valueFromStorage == null) {
		  setTemperatureSettings(true);
    } else {
		  value = valueFromStorage === "true";
    }
    return value;
  }
  return true;

};

export const setTemperatureSettings =  (useCelsius: boolean) => {
  if (typeof window !== "undefined") {
  		localStorage.setItem("useCelsius", useCelsius.toString());
  }
};