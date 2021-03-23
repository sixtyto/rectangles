const useContrastTextColor = (color: string) => {
  const red = parseInt(color.slice(1, 3), 16) / 255;
  const green = parseInt(color.slice(3, 5), 16) / 255;
  const blue = parseInt(color.slice(5, 7), 16) / 255;
  const colorMin = Math.min(red, green, blue);
  const colorMax = Math.max(red, green, blue);
  const l = (colorMax + colorMin) / 2;
  return l < 0.6 ? "white" : "black";
};

export default useContrastTextColor;
