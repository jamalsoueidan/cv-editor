import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";

import { dumbData } from "~/components/dumbData";
import { PDFContainer } from "~/components/PDFContainer";

export const resumes = [
  {
    ...dumbData,
    firstname: "Steve",
    lastname: "Jobs",
    position: "CEO Apple",
    template: { ...dumbData.template, name: "Copenhagen", color: "#e64980" },
  },
  {
    ...dumbData,
    firstname: "Jen-Hsun",
    lastname: "Huang",
    position: "CEO Nvidia",
    template: { ...dumbData.template, name: "Aarhus", color: "#be4bdb" },
  },
  {
    ...dumbData,
    firstname: "Elon",
    lastname: "Musk",
    position: "CEO Tesla",
    photoUrl:
      "https://nationaltoday.com/wp-content/uploads/2022/05/123-Elon-Musk-150x150.jpg",
    template: { ...dumbData.template, name: "Copenhagen", color: "#7950f2" },
  },
  {
    ...dumbData,
    firstname: "David",
    lastname: "Hansson",
    position: "CEO Basecamp",
    template: { ...dumbData.template, name: "Aarhus", color: "#4c6ef5" },
  },
  {
    ...dumbData,
    firstname: "Seth",
    lastname: "Godin",
    position: "Marketing",
    template: { ...dumbData.template, name: "Aarhus", color: "#4c6ef5" },
  },
];

export const CVCarousel = memo(function () {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Carousel
        withIndicators={resumes && resumes.length >= 2}
        withControls={resumes && resumes.length >= 2}
        slideSize={{
          base: "80%",
          sm: "40%",
          md: "25%",
        }}
        slideGap={{ base: "sm", sm: "md" }}
        loop={!isMobile}
      >
        {resumes?.map((resume, index) => (
          <Carousel.Slide key={index}>
            <PDFContainer
              templateElement={<PDFContainer.Template data={resume} />}
            >
              <PDFContainer.Viewer withBorder />
            </PDFContainer>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
});
