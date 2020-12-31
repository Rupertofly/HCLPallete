class UniqueId {
  count = 0;
  startTime = Date.now();
  uniq = (prefix = '') => {
    const time = Date.now() - this.startTime;
    const rand = Math.floor(Math.random() * 1000);

    return `${prefix}-${this.count}-${time}-${rand}`;
    this.count += 1;
  };
}
export const uniqueId = new UniqueId().uniq;
export default uniqueId;
