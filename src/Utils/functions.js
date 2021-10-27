/**
 * Misc. functions
 */

// language translation
/* eslint-disable */
export const setLocalizeContent = (obj, store) => {
  try {
    return obj.en;
    // return obj[store.get("language")];
  } catch (error) {
    // console.log(error);
    return { en: "", az: "", ru: "" };
  }
};

// first letter capitalize
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// deep clone an object
export const deepClone = (obj) => {
  var copy;

  // eslint-disable-next-line
  if (obj == null || typeof obj != "object") {
    return obj;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepClone(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

// check if empty or not
export const isEmpty = (object, dataType = "object") => {
  switch (dataType) {
    case "object": {
      return !Object.keys(object).length;
    }
    default: {
      return false;
    }
  }
};

//check if object has any true value in it or not
export const checkTrueValue = (obj) => {
  const valuesOfObject = Object.values(obj);
  const TrueFalse = valuesOfObject.includes(true);
  return TrueFalse;
};
//Remove a value from array
export const removerValue = (item, index, qty) => {
  const selectedItem = item?.splice(index, qty);
  const finalArray = item?.filter((item) => {
    return item !== selectedItem;
  });
  return finalArray;
};

//Check For Numbers Only
export const isNumber = (mobile) => {
  if (mobile) {
    let regex = new RegExp(/^[0-9]*$/);
    return regex.test(mobile);
  } else return false;
};
// Check WHITE space
export const checkWhiteSpace = (text) => {
  const _text = text.trim();
  return text === _text;
};

// Return Object From Array if Condition True

export const CheckConditionArray = (array,condition,key,subkey) => {
  const obj = array?.filter(item => { 
    return  item[condition]
  })
  if(subkey)
  {
    return obj[0][key][subkey];
  }
  else
  {
    return obj[0][key];
  }
}
