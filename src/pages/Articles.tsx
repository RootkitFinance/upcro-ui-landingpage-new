
import React, {useEffect, useState} from 'react'
import { Box, SimpleGrid, GridItem, Image, Heading, Container } from '@chakra-ui/react';
import HowToBuySec from '../components/Home/HowToBuySec';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import Layout from './Layout';
import AOS from 'aos';
import Axios from 'axios';

interface IArticle {
  title?: string;
  thumbnail?: string;
  pubDate?: string;
  link?: string;
}


export default function Articles() {
  AOS.init();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  console.log(articles)
  return (
    <Layout className='app-page'>
      <>
        <Box className="article_main_page">
          <Image src='img/articl_bg_01.png' className="articl_bg_01" alt='' />
          <Image src='img/articl_bg_02.png' className="articl_bg_02" alt='' />
          <Container maxW="container.xl" className='article_main_page_inn'>
            <SimpleGrid columns={20} columnGap={4} rowGap={3} >
              <GridItem colSpan={[20, 20, 12, 12]}>
                <Box className='article_left_box'>
                  <Box className='article_text_img'><Image src='img/midium_art_ic.svg' alt='' /><Heading as="h3">Articles</Heading> </Box>
                  <Image src='img/article_img_01.png' className="article_img_01" alt='' />
                  <Image src='img/article_img_02.png' className="article_img_01" alt='' />
                  <Image src='img/article_img_03.png' className="article_img_01" alt='' />
                  <Image src='img/article_img_04.png' className="article_img_01" alt='' />
                  <Image src='img/article_img_05.png' className="article_img_01" alt='' />
                  <Image src='img/pagination_img.png' className="pagination_img" alt='' />
                </Box>
              </GridItem>
              <GridItem colSpan={[16, 16, 8, 8]}>
                <Box className='tweets_box'>
                  <Box className='article_text_prnt'>
                    <Box className='article_text_img'><Image src='img/tweet_art_ic.svg' alt='' /><Heading as="h3">Tweets</Heading> </Box>
                  </Box>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="up_cro"
                    theme='dark'
                  />
                </Box>
              </GridItem>
            </SimpleGrid>
          </Container>
          <HowToBuySec />
        </Box>
      </>
    </Layout>
    
  )
}