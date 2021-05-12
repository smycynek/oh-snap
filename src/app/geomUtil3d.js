 const dot = (x1, y1, z1, x2, y2, z2) => {
  return x1*x2 + y1*y2 + z1*z2;
}

 const vdot = (v1, v2) => {
  return dot(v1[0], v1[1], v1[2], v2[0], v2[1], v2[2])
}

 const length = (x1, y1, z1) => {
  return Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2) + Math.pow(z1,2) );
}

 const vlength = (v) => {
  return length(v[0], v[1], v[2])
};

const cross = (x1, y1, z1, x2, y2, z2) => {
  console.log ([y1*z2 - y2*z1, -1*(x1*z2 -x2*z1), (x1*y2 - x2*y1)]);
  return [y1*z2 - y2*z1, -1*(x1*z2 -x2*z1), (x1*y2 - x2*y1)];

};

 const scale  = (x,y,z,s) => {
  return [x*s, y*s, z*s];
}

 const vscale = (v, s) => {
  return scale(v[0], v[1], v[2], s);
};

const project = (w, v) => {
  console.log(`project v ${v} onto w ${w}`)
  return vscale(w, 
    vdot(v,w) / Math.pow(vlength(w),2)
  )};