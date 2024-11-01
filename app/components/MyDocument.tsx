import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { HtmlElement } from "node_modules/react-pdf-html/dist/types/parse";
import Html from "react-pdf-html";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: { fontFamily: "Oswald" },
  section: {
    backgroundColor: "tomato",
  },
  headerImage: {
    height: 150,
  },
  title: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
  },
});

// Create Document Component
export const MyDocument = ({
  data,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
}) => {
  return (
    <Document style={{ padding: 0, margin: 0 }}>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {data.photoUrl ? (
            <Image src={data.photoUrl} style={styles.headerImage} />
          ) : null}
          <View
            style={{ marginLeft: 4, backgroundColor: "orange", width: "100%" }}
          >
            <View style={{ marginLeft: 20, marginTop: 5, marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 32,
                  lineHeight: 1.2,
                }}
              >
                {data.firstname?.toUpperCase() || "Firstname"}
              </Text>
              <Text
                style={{
                  fontSize: 32,
                }}
              >
                {data.lastname?.toUpperCase() || "Lastname"}
              </Text>
              <Text style={styles.title}>
                {data.position || "Frontend Developer"}
              </Text>
              <Text style={styles.link}>
                https://www.medium.com/@jamalsoueidan
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 15,
            fontSize: 12,
          }}
        >
          <View style={{ marginBottom: 25 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  backgroundColor: "black",
                  color: "white",
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingBottom: 4,
                  marginBottom: 8,
                }}
              >
                DETAILS
              </Text>
            </View>
            <Text>Aarhus, Denmark</Text>
            <Text>jamal@soueidan.com</Text>
            <Text>+45 3131 7428</Text>
          </View>

          <View style={{ marginBottom: 25 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  backgroundColor: "black",
                  color: "white",
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingBottom: 4,
                  marginBottom: 8,
                }}
              >
                PROFILE
              </Text>
            </View>

            {data.content ? (
              <Html
                resetStyles
                renderers={{
                  //https://github.com/danomatic/react-pdf-html/issues/51#issuecomment-2173007044
                  li: ({ element, style, children }) => {
                    const list = element.closest("ol, ul") as HtmlElement;
                    const isOrderedList =
                      list?.tag === "ol" || element.parentNode.tag === "ol";

                    return (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View>
                          <Text>
                            {isOrderedList
                              ? `${element.indexOfType + 1}. `
                              : "• "}
                          </Text>
                        </View>
                        <View>
                          <Text>{children}</Text>
                        </View>
                      </View>
                    );
                  },
                }}
              >
                {`<html><body><style>ul,ol { margin: 12px; }</style>` +
                  data.content +
                  "</body></html>"}
              </Html>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
};
