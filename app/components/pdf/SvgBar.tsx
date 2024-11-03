import { Rect, Svg } from "@react-pdf/renderer";

export const SvgBar = ({ level: oldLevel }: { level: string }) => {
  const level = parseInt(oldLevel);
  const totalWidth = 250;
  const widthOfFirstRect = (level / 5) * totalWidth;
  const widthOfSecondRect = totalWidth - widthOfFirstRect;

  return (
    <Svg width="250" height="5" viewBox={`0 0 ${totalWidth} 5`}>
      <Rect width={widthOfFirstRect} height="5" fill="black" />

      <Rect
        x={widthOfFirstRect}
        y="0"
        width={widthOfSecondRect}
        height="5"
        fill="#eaeaea"
      />
    </Svg>
  );
};
