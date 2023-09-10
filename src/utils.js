function a(o, n, r) {
  n.addEventListener(o, function (t) {
    r.dispatchEvent(new t.constructor(t.type, t)),
      t.preventDefault(),
      t.stopPropagation();
  });
}
export { a as forwardEvent };
