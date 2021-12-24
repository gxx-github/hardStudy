const subtraction = <T>(pre: T[], next: T[]): T[] => {
    const setPre = new Set(pre);
    const setNext = new Set(next);
    return [...pre.filter((val: T) => !setNext.has(val)), ...next.filter((val: T) => !setPre.has(val))];
  };
  
  export default subtraction;