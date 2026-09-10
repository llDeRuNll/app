export const moveItem = <T>(
  items: T[],
  fromIndex: number,
  toIndex: number,
): T[] => {
  const newItems = [...items];

  const [movedItem] = newItems.splice(fromIndex, 1);

  if (movedItem === undefined) {
    return items;
  }
  newItems.splice(toIndex, 0, movedItem);
  return newItems;
};
