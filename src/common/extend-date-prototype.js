export default function extendDatePrototype() {
  if ('subtractHours' in Date.prototype) return;

  Date.prototype.subtractHours = function (hoursDiff) {
    return new Date(this.getTime() - hoursDiff * 1000 * 60 * 60);
  };

  Date.prototype.getDatetimeLocalValue = function () {
    this.setSeconds(0);
    const time = this.getTime();
    return new Date(time + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19);
  };
}
