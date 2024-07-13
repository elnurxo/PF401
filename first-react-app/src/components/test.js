export function display(x, y, z) {
  let obj = {
    x,
    y,
    z,
  };

  return obj;
}

display(3,5,6);


let person = {fname: 'joe',surname:'doe'};

const{fname} = person;
console.log(fname)
