import {
  Avatar,
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

function Testimonial({ data }: any) {
  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
      py={16}
      px={8}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        {data.content}
      </Text>
      <Box textAlign={"center"}>
        <Avatar src={data.avatar} mb={2} />

        <Text fontWeight={600}>{data.name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          {data.role}
        </Text>
      </Box>
    </Stack>
  );
}

export default function Testimonials() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} py={16} px={8}>
      <Container maxW={"7xl"}>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            clickable: false,
            type: "fraction",
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {testimonials.map((el: any) => (
            <SwiperSlide key={el.name}>
              <Testimonial data={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

const testimonials = [
  {
    name: "Brandon P.",
    role: "Chief Marketing Officer",
    content:
      "It really saves me time and effort. It is exactly what our business has been lacking. This site is the most valuable business resource we have EVER purchased. After using This site my business skyrocketed!",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Krysta B.",
    role: "Entrepreneur",
    content:
      "I didn't even need training. We've used This site for the last five years. I have gotten at least 50 times the value from This site. I made back the purchase price in just 48 hours!",
    avatar:
      "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Darcy L.",
    role: "Movie star",
    content:
      "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, This site is the coolest, most happening thing around! I love This site!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
  },
  {
    name: "Daniel T.",
    role: "Musician",
    content:
      "I am so pleased with this product. This site is both attractive and highly adaptable. Without This site, we would have gone bankrupt by now. Thank you for creating this product!",
    avatar:
      "https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
];
