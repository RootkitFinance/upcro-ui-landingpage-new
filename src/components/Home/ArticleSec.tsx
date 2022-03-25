
import React, {useEffect, useState} from 'react'
import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from 'axios';

interface IArticle {
    title?: string;
    thumbnail?: string;
    pubDate?: string;
    link?: string;
}

export default function ArticleSec() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

      const [articles, setArticles] = useState<IArticle[]>([])

      useEffect(() => {
        let mediumURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@upcro"
        Axios.get(mediumURL)
          .then((data) => {
            const res = data.data.items; //This is an array with the content. No feed, no info about author etc..    
            let articlesData = res != undefined ? res.map((e: any) => {
                return {
                    title: e.title,
                    pubDate: e.pubDate, 
                    thumbnail: e.thumbnail,
                    link: e.link
                }
            }) : []

            console.log(res)
            setArticles(articlesData)
          })
          .catch((e) => {
            // this.setState({ error: e.toJSON() })
            console.log(e);
          });
      }, [])
      
  return (
    <>
        <Box className='articlesec_main' data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <Container maxW="container.xl">
                <Heading as="h6">Read about</Heading>
                <Heading as="h3">Articles</Heading>
                <Box className='slider_prnt_artcl'>
                    <Slider {...settings}>
                        { 
                            articles !=  undefined ? 
                            articles.slice(0,5).map((article) => {
                                return <div>
                                    <Box className='artcl_slider_cntnt'>
                                        <Box className='artcl_slider_inn'>
                                            <Image src={article.thumbnail} alt='' />
                                            <Box className='slider_text_box'>
                                                <Heading as="h4">{article.title}</Heading>
                                                <Box className='flex_box'>
                                                    <Text><Image src='img/clndr_ic.svg' alt='' /> {article.pubDate}</Text>
                                                    <Button as="a" href={article.link}>Read More <Image src='img/arrow_ic.svg' alt='' /></Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </div> 
                            }) : <></>
                        }
                    </Slider>
                </Box>
            </Container>
        </Box>
    </>
  )
}
