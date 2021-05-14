export const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

export const midpoint = (x1, y1, x2, y2) => {
  return {
    x: (x2+x1)/2,
    y: (y2+y1)/2
  }
}

const LINE_MIN = 50;
const LINE_MAX = 450;

export const randomIntBounds = (min, max) => {
  var value = Math.floor(Math.random() * (max-min)) + min;
  return value;
}

export const randomLinePosition = () => {
  return randomIntBounds(LINE_MIN, LINE_MAX);
};

export const randomLineData = () => {
  return {
    x1: randomLinePosition(),
    y1: randomLinePosition(),
    x2: randomLinePosition(),
    y2: randomLinePosition()
  };
};
