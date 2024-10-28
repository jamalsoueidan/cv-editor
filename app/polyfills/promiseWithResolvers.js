// app/polyfills/promiseWithResolvers.js

// Check if `Promise.withResolvers` already exists in the environment
if (typeof Promise.withResolvers === "undefined") {
  const polyfill = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };

  if (typeof window !== "undefined") {
    // In browser
    // @ts-expect-error Polyfilling Promise.withResolvers
    window.Promise.withResolvers = polyfill;
  } else if (typeof global !== "undefined") {
    // In Node.js
    // @ts-expect-error Polyfilling Promise.withResolvers
    global.Promise.withResolvers = polyfill;
  }
}
