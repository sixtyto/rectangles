const useValidatedSize = (rectangleSize: number, boardSize: number) => {
  if (
    typeof rectangleSize === "number" &&
    rectangleSize > 0 &&
    rectangleSize < boardSize
  )
    return rectangleSize;
  return 0;
};

export default useValidatedSize;
