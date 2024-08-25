export const formatProductCount = (count: number): string => {
    return count < 10 ? `0${count}` : count.toString();
  };
  