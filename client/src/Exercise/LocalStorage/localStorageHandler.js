// handling the localStorage without connecting it to a state (since it probably caused sync problems when configuring settings while playing the exercises)
export default function localStorageHandler(key, initialValue) {
  const item = window.localStorage.getItem(key);
  const storedValue = item ? JSON.parse(item) : initialValue;
  
  const setValue = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  if (!item) setValue(initialValue);
  
  return [storedValue, setValue];
}