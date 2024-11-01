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
            <Text>
              Casi todo aquel día caminó sin acontecerle cosa que de contar
              fuese, de lo cual se desesperaba, porque quisiera topar luego
              luego con quien hacer experiencia del valor de su fuerte brazo.
              Autores hay que dicen que la primera aventura que le avino fue la
              del Puerto Lápice, otros dicen que la de los molinos de viento;
              pero lo que yo he podido averiguar en este caso, y lo que he
              hallado escrito en los anales de la Mancha, es que él anduvo todo
              aquel día, y, al anochecer, su rocín y él se hallaron cansados y
              muertos de hambre, y que, mirando a todas partes por ver si
              descubriría algún castillo o alguna majada de pastores donde
              recogerse y adonde pudiese remediar su mucha hambre y necesidad,
              vio, no lejos del camino por donde iba, una venta,que fue como si
              viera una estrella que, no a los portales, sino a los alcázares de
              su redención le encaminaba. Diose priesa a caminar, y llegó a ella
              a tiempo que anochecía.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
