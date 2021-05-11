export const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
}

export const midpoint = (x1, y1, x2, y2) => {
  return {
    x: (x2+x1)/2,
    y: (y2+y1)/2
  }
}

export const quadrants = (x, y, r) => {
  return [
    {
      x: x+r,
      y
    },
    {
      x: x,
      y: y+r
    },
    {
      x: x-r,
      y
    },
    {
      x: x,
      y: y-r
    },
  ]
};


const LINE_MIN = 50;
const LINE_MAX = 450;

const CIRCLE_CENTER_MIN=100;
const CIRCLE_CENTER_MAX=400;

const CIRCLE_RADIUS_MIN = 50;
const CIRCLE_RADIUS_MAX = 90;

export const randomIntBounds = (min, max) => {
  var value = Math.floor(Math.random() * (max-min)) + min;
  console.log(value);
  return value;
}

export const randomCirclePosition = () => {
    return randomIntBounds(CIRCLE_CENTER_MIN, CIRCLE_CENTER_MAX);
};

export const randomCircleRadius = () => {
  return randomIntBounds(CIRCLE_RADIUS_MIN, CIRCLE_RADIUS_MAX)
};

export const randomLinePosition = () => {
  return randomIntBounds(LINE_MIN, LINE_MAX);
};

export const randomCircleData = () => {
  return {
    x: randomCirclePosition(),
    y: randomCirclePosition(),
    radius: randomCircleRadius()
  };
};

export const randomLineData = () => {
  return {
    x1: randomLinePosition(),
    y1: randomLinePosition(),
    x2: randomLinePosition(),
    y2: randomLinePosition()
  };
};


