import { encoded, translations } from "./data.js";

const decoded = (code, translation) => {
  const info = new Map(Object.entries(translation));

  const newObj = [];
  let uniqueIds = new Set();

  code.forEach((item) => {
    const map = new Map(Object.entries(item));

    for (let [key, value] of map) {
      if (key.indexOf("Id") !== -1 && key !== "groupId") {
        if (info.has(value)) {
          uniqueIds.add(value);
          const newValue = info.get(value);
          map.set(key, newValue);
        }
      }
    }
    newObj.push(Object.fromEntries(map));
  });
  return newObj;
};

console.log(decoded(encoded, translations));
