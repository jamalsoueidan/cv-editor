import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  /*page: {
    flexDirection: "row",
    backgroundColor: "#FFF",
  },*/
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 12,
    margin: 12,
    fontFamily: "Oswald",
  },
});

// Create Document Component
export const MyDocument = ({ text }: { text: Array<any> | undefined }) => {
  return (
    <Document>
      <Page size="A4">
        {text?.map((text) => (
          <View style={styles.section} key={text._id}>
            <Text>{text.body}</Text>
          </View>
        ))}
      </Page>
      <Page size="A4">
        <Text style={styles.subtitle}>
          Casi todo aquel día caminó sin acontecerle cosa que de contar fuese,
          de lo cual se desesperaba, porque quisiera topar luego luego con quien
          hacer experiencia del valor de su fuerte brazo. Autores hay que dicen
          que la primera aventura que le avino fue la del Puerto Lápice, otros
          dicen que la de los molinos de viento; pero lo que yo he podido
          averiguar en este caso, y lo que he hallado escrito en los anales de
          la Mancha, es que él anduvo todo aquel día, y, al anochecer, su rocín
          y él se hallaron cansados y muertos de hambre, y que, mirando a todas
          partes por ver si descubriría algún castillo o alguna majada de
          pastores donde recogerse y adonde pudiese remediar su mucha hambre y
          necesidad, vio, no lejos del camino por donde iba, una venta,que fue
          como si viera una estrella que, no a los portales, sino a los
          alcázares de su redención le encaminaba. Diose priesa a caminar, y
          llegó a ella a tiempo que anochecía.
        </Text>
      </Page>
    </Document>
  );
};
