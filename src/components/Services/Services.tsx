import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import assAuto from "../../assets/ass_auto.jpg";
import assImmo from "../../assets/assImo.jpg";
import assSante from "../../assets/ma-sante.jpg";

const services = [
  {
    img: assAuto,
    title: "ASSURANCE AUTOMOBILE",
    description:
      "Votre véhicule vous accompagne sur tous les trajets du quotidien. Pensez à le protéger ainsi que ses occupants avec une bonne assurance auto",
    disabled: false,
  },
  {
    img: assImmo,
    title: "MULTIRISQUES HABITATION",
    description:
      "Que vous soyez propriétaire ou locataire, Votre maison et tout ce qu'elle contient constitue votre cadre de vie. Pensez à la protéger avec une assurance",
    disabled: false,
  },
  {
    img: assSante,
    title: "ASSURANCES SANTÉ",
    description:
      "Votre bien le plus précieux, en Tunisie ou à l'international, l'assurance maladie n'est plus une option !",
    disabled: true,
  },
];

export default function Services() {
  return (
    <Box
      bg="blue.50"
      py="8"
      bgGradient="linear(to-t, white, blue.50, white)"
      px="4"
      mb="20"
    >
      <Container maxW="7xl">
        <Heading
          textAlign={"center"}
          size={"2xl"}
          mt="20"
          maxW={"50rem"}
          mx="auto"
          fontWeight={"900"}
          textTransform="uppercase"
        >
          Une assurance pour chaque détail de votre vie
        </Heading>
        <Text textAlign={"center"} mx="auto" mt="4" mb="12" maxW="30rem">
          Ne laissez plus votre vie et celle de votre famille entre les mains du
          hasard. Nous vous protègeons en toutes circonstances
        </Text>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          speed={500}
          autoplay
          pagination={{
            clickable: false,
            type: "custom",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {services.map((el: any) => (
            <SwiperSlide key={el.title}>
              <Card item={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}
