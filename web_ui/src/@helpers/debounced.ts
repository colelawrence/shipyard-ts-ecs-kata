function debounced<F extends (...args: any) => any>(ms: number, a: F): F {
  let timer: any;
  // @ts-ignore
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(a.bind(this, ...args), ms);
  };
}
