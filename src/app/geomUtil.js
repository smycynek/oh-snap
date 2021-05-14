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
  console.log(value);
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

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}