
import React, {useEffect} from 'react'
import { Box, SimpleGrid, GridItem, Image, Heading, Container } from '@chakra-ui/react';
import HowToBuySec from '../components/Home/HowToBuySec';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import Layout from './Layout';
import AOS from 'aos';
import Axios from 'axios';

export default function Articles() {
  AOS.init();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let mediumURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@upcro"
    Axios.get(mediumURL)
      .then((data) => {
        // console.log(data.data)
        // const avatar = data.data.feed.image;
        // const profileLink = data.data.feed.link;
        const res = data.data.items; //This is an array with the content. No feed, no info about author etc..
        // const posts = res.filter((item: { categories: string | any[]; }) => item.categories.length > 0);
        // const title = data.data.feed.title;

        // this.setState(
        //   (pre) => ({
        //     profile: {
        //       ...pre.profile,
        //       ptitle: title,
        //       profileurl: profileLink,
        //       avtar: avatar,

        //     },
        //     item: posts,
        //     isloading: false
        //   }),
        //   () => {
        //     console.log(this.state);
        //   }
        // );
        console.log(res);
      })
      .catch((e) => {
        // this.setState({ error: e.toJSON() })
        console.log(e);
      });
  }, [])
  return (
    <Layout className='app-page'>
      <>
        <Box className="article_main_page">
          <Container maxW="container.xl">
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