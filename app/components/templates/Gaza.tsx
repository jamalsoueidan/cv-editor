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
import { EditorHTML } from "../pdf/EditorHTML";
import { TemplateLocale } from "./locales";

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
  page: { fontFamily: "Open Sans", fontSize: 12 },
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
export const Gaza = ({
  data,
  lang,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
  lang: TemplateLocale;
}) => {
  return (
    <Document style={{ padding: 0, margin: 0 }}>
      <Page size="A4" style={styles.page} wrap>
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
              backgroundColor: "#FF0040",
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

              <EditorHTML content={data.content} />
            </View>
          ) : null}
          {data.workExperiences?.length > 0 ? (
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
              {data.workExperiences?.map((workExperience, index) => (
                <View key={index} style={{ marginBottom: 12 }} wrap>
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
                    <Text style={{ color: "#666", fontSize: 10 }}>
                      {workExperience.startDate
                        ? dayjs(workExperience.startDate).format("MMM YYYY")
                        : null}
                      {workExperience.startDate && workExperience.endDate
                        ? " - "
                        : null}

                      {workExperience.endDate
                        ? dayjs(workExperience.endDate).format("MMM YYYY")
                        : null}
                    </Text>
                  ) : null}
                  {workExperience.description ? (
                    <View style={{ marginTop: 4 }}>
                      <EditorHTML content={workExperience.description} />
                    </View>
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
