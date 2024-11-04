import {
  Document,
  Link,
  Page,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { api } from "convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import dayjs from "dayjs";
import React from "react";
import { EditorHTML } from "../pdf/EditorHTML";
import { SvgBar } from "../pdf/SvgBar";
import { TemplateLocale } from "./locales";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
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
export const Gaza = ({
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
            top: 12,
            left: 12,
            right: 12,
            flexDirection: "row",
            maxHeight: 200,
            borderRadius: 24,
          }}
        >
          <Svg viewBox={`0 0 1500 200`}>
            <Rect
              x="0"
              width="1500"
              height="200"
              rx="25"
              ry="25"
              fill={data.template.color}
            />
          </Svg>
        </View>

        <View
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            flexDirection: "row",
            maxHeight: 100,
            borderRadius: 24,
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                marginBottom: 10,
                flexDirection: "row",
              }}
            >
              {data.firstname || data.lastname ? (
                <Text
                  style={{
                    fontSize: 32,
                  }}
                >
                  {data.firstname?.toUpperCase()} {data.lastname?.toUpperCase()}
                </Text>
              ) : null}

              {data.position ? (
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "right",
                    marginTop: 10,

                    flex: 1,
                  }}
                >
                  {data.position}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        <View style={{ marginTop: 60 }}></View>

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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.details.toUpperCase()}
              </Text>

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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.profile.toUpperCase()}
              </Text>

              <EditorHTML content={data.content} />
            </View>
          ) : null}
          {data.workExperiences?.length > 0 ? (
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.workExperience.toUpperCase()}
              </Text>

              {data.workExperiences?.map((workExperience, index) => (
                <React.Fragment key={index}>
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
                  <View style={{ marginBottom: 12 }} />
                </React.Fragment>
              ))}
            </View>
          ) : null}
          {data.educations?.length > 0 ? (
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.education.toUpperCase()}
              </Text>

              {data.educations?.map((education, index) => (
                <View key={index} style={{ marginBottom: 12 }}>
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
          {data.socialProfiles?.length > 0 ? (
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.links.toUpperCase()}
              </Text>

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
          {data.languages?.length > 0 ? (
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.languages.toUpperCase()}
              </Text>

              {data.languages?.map((skill, index) => (
                <View style={{ marginBottom: 9 }} key={index}>
                  <Text style={{ marginBottom: 4 }}>{skill.language}</Text>
                  <SvgBar level={skill.level} />
                </View>
              ))}
            </View>
          ) : null}
          {data.skills?.length > 0 ? (
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecoration: "underline",
                  paddingBottom: 6,
                }}
              >
                {lang.skills.toUpperCase()}
              </Text>

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
                    >
                      <View style={{ width: "50%" }}>
                        <Text style={{ marginBottom: 4 }}>
                          {data.skills[index].title}
                        </Text>
                        <SvgBar level={data.skills[index].level} />
                      </View>

                      {data.skills[index + 1] && (
                        <View style={{ width: "50%" }}>
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
