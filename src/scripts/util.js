//==== UI ====\\
/**
 * Throttle
 */
export function throttle(func, wait = 100) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

/**
 * Debounce
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//==== API ====\\
/**
 * Get Category
 */
export function getApiCategory(category) {
  return new Promise((resolve, reject) => {
    if(!category) return resolve(null);

    const req = new Request(`//localhost:3001/?category=${category}`);
    fetch(req)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => console.log('Error in getApiCategory fetch:', err));
  })
}

//==== Dev ====\\
/**
 * Devlog
 */
export function devLog(message) {
  if (window.location.host.indexOf('localhost') > -1) console.log(message);
}