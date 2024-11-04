import { Text, View } from "@react-pdf/renderer";
import { HtmlElement } from "node_modules/react-pdf-html/dist/types/parse";
import Html from "react-pdf-html";

export function EditorHTML({ content }: { content: string }) {
  return (
    <Html
      resetStyles
      renderers={{
        //https://github.com/danomatic/react-pdf-html/issues/51#issuecomment-2173007044
        li: ({ element, children }) => {
          const list = element.closest("ol, ul") as HtmlElement;
          const isOrderedList =
            list?.tag === "ol" || element.parentNode.tag === "ol";

          return (
            <View>
              <Text>
                {isOrderedList ? `${element.indexOfType + 1}. ` : "• "}
                {children}
              </Text>
            </View>
          );
        },
        strong: ({ children }) => {
          return (
            <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
              {children}
            </Text>
          );
        },
      }}
    >
      {`<html><body><style>body { font-size: 12px; } ul,ol { margin: 12px; } </style>` +
        content +
        "</body></html>"}
    </Html>
  );
}
