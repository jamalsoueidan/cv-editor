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
import dayjs from "dayjs";
import { HtmlElement } from "node_modules/react-pdf-html/dist/types/parse";
import Html from "react-pdf-html";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: { fontFamily: "Open Sans" },
  section: {
    backgroundColor: "tomato",
  },
  headerImage: {
    width: 180,
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
            maxHeight: 150,
          }}
        >
          {data.photoUrl ? (
            <Image src={data.photoUrl} style={styles.headerImage} />
          ) : null}
          <View
            style={{
              backgroundColor: "orange",
              width: "100%",
              ...(data.photoUrl ? { marginLeft: 4 } : {}),
            }}
          >
            <View style={{ marginLeft: 20, marginTop: 5, marginBottom: 10 }}>
              {data.firstname ? (
                <Text
                  style={{
                    fontSize: 32,
                    ...(data.lastname ? { lineHeight: 1.2 } : {}),
                  }}
                >
                  {data.firstname.toUpperCase()}
                </Text>
              ) : null}
              {data.lastname ? (
                <Text
                  style={{
                    fontSize: 32,
                  }}
                >
                  {data.lastname.toUpperCase()}
                </Text>
              ) : null}
              {data.position ? (
                <Text style={styles.title}>{data.position}</Text>
              ) : null}
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
          {data.city || data.country || data.email || data.phone ? (
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
                  DETALJER
                </Text>
              </View>
              {data.city || data.country ? (
                <Text>
                  {data.city ? data.city : null}
                  {data.city && data.country ? ", " : null}
                  {data.country}
                </Text>
              ) : null}
              {data.email ? <Text>{data.email}</Text> : null}
              {data.phone ? <Text>{data.phone}</Text> : null}
            </View>
          ) : null}
          {data.content ? (
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

              <Html
                resetStyles
                renderers={{
                  //https://github.com/danomatic/react-pdf-html/issues/51#issuecomment-2173007044
                  li: ({ element, children }) => {
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
                  strong: ({ children }) => {
                    return (
                      <Text
                        style={{ fontFamily: "Open Sans", fontWeight: "bold" }}
                      >
                        {children}
                      </Text>
                    );
                  },
                }}
              >
                {`<html><body><style>body { font-size: 14px; } ul,ol { margin: 12px; } </style>` +
                  data.content +
                  "</body></html>"}
              </Html>
            </View>
          ) : null}
          {data.workExperiences.length > 0 ? (
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
                  ANSÆTTELSESHISTORIK
                </Text>
              </View>
              {data.workExperiences.map((workExperience, index) => (
                <View key={index}>
                  <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
                    {workExperience.position}
                    {workExperience.position && workExperience.company
                      ? ", "
                      : null}
                    {workExperience.company}
                    {workExperience.company && workExperience.city
                      ? ", "
                      : null}
                    {workExperience.city}
                  </Text>

                  {workExperience.startDate || workExperience.endDate ? (
                    <Text style={{ color: "#666" }}>
                      {dayjs(workExperience.startDate).format("MMM YYYY")}
                      {workExperience.startDate && workExperience.endDate
                        ? " - "
                        : null}
                      {dayjs(workExperience.endDate).format("MMM YYYY")}
                    </Text>
                  ) : null}
                  {workExperience.description ? (
                    <Text>{workExperience.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};
