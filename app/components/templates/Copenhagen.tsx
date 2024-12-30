import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { api } from "convex/_generated/api";
import { type FunctionReturnType } from "convex/server";
import dayjs from "dayjs";
import { EditorHTML } from "../pdf/EditorHTML";
import { SvgBar } from "../pdf/SvgBar";
import { type TemplateLocale } from "./locales";

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
  page: {
    fontFamily: "Open Sans",
    fontSize: 12,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    backgroundColor: "tomato",
  },
  headerImage: {
    width: 150,
    borderTopLeftRadius: 15,
  },
  title: {
    fontSize: 14,
  },
  link: {
    fontSize: 14,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

// Create Document Component
export const Copenhagen = ({
  data,
  lang,
}: {
  data: FunctionReturnType<typeof api.resumes.get>;
  lang: TemplateLocale;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            maxHeight: 150,
          }}
        >
          {data.photoUrl ? (
            <Image src={data.photoUrl} style={styles.headerImage} />
          ) : null}
          <View
            style={{
              backgroundColor: data.template.color,
              width: "100%",
              borderTopRightRadius: 15,
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
            </View>
          </View>
        </View>

        <View style={{ marginTop: 100 }}></View>

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
                  {lang.details.toUpperCase()}
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
                  {lang.profile.toUpperCase()}
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
                  {lang.workExperience.toUpperCase()}
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
          {data.educations?.length > 0 ? (
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
                  {lang.education.toUpperCase()}
                </Text>
              </View>
              {data.educations?.map((education, index) => (
                <View key={index} style={{ marginBottom: 12 }} wrap>
                  <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
                    {education.degree}
                    {education.degree && education.school ? ", " : null}
                    {education.school}
                    {education.school && education.city ? ", " : null}
                    {education.city}
                  </Text>

                  {education.startDate || education.endDate ? (
                    <Text style={{ color: "#666", fontSize: 10 }}>
                      {education.startDate
                        ? dayjs(education.startDate).format("MMM YYYY")
                        : null}
                      {education.startDate && education.endDate ? " - " : null}

                      {education.endDate
                        ? dayjs(education.endDate).format("MMM YYYY")
                        : null}
                    </Text>
                  ) : null}
                  {education.description ? (
                    <View style={{ marginTop: 4 }}>
                      <EditorHTML content={education.description} />
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          ) : null}
          {data.socialProfilesVisible && data.socialProfiles?.length > 0 ? (
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
                  {lang.links.toUpperCase()}
                </Text>
              </View>
              {data.socialProfiles?.map((social, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 12 }}
                >
                  <Link
                    href={social.url}
                    style={{
                      fontFamily: "Open Sans",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {social.label}
                  </Link>
                </View>
              ))}
            </View>
          ) : null}
          {data.languagesVisible && data.languages?.length > 0 ? (
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
                  {lang.languages.toUpperCase()}
                </Text>
              </View>
              {data.languages?.map((skill, index) => (
                <View style={{ marginBottom: 9 }} key={index}>
                  <Text style={{ marginBottom: 4 }}>{skill.language}</Text>
                  <SvgBar level={skill.level} />
                </View>
              ))}
            </View>
          ) : null}
          {data.skillsVisible && data.skills?.length > 0 ? (
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
                  {lang.skills.toUpperCase()}
                </Text>
              </View>
              {data.skills?.map(
                (skill, index) =>
                  index % 2 === 0 && (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        marginBottom: 9,
                      }}
                      wrap={false}
                    >
                      <View style={{ width: "50%" }} wrap={false}>
                        <Text style={{ marginBottom: 4 }}>
                          {data.skills[index].title}
                        </Text>
                        <SvgBar level={data.skills[index].level} />
                      </View>

                      {data.skills[index + 1] && (
                        <View style={{ width: "50%" }} wrap={false}>
                          <Text style={{ marginBottom: 4 }}>
                            {data.skills[index + 1].title}
                          </Text>
                          <SvgBar level={data.skills[index + 1].level} />
                        </View>
                      )}
                    </View>
                  )
              )}
            </View>
          ) : null}
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
