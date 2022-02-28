import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";

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
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
        </Swiper>
      </Container>
    </Box>
  );
}
