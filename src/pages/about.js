import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const AboutUsPage = () => {
  const {
    wpcontent: {
      page: {
        aboutUsPageMeta: { 
          aboutUsDescription, 
          aboutUsPageHeaderPicture ,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "about", idType: URI) {
          aboutUsPageMeta {
                aboutUsDescription
                aboutUsPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Seo title="About-Us" />
      <Wrapper descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image
            fluid={aboutUsPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={aboutUsPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <h2>About Us</h2>
          <p>{aboutUsDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AboutUsPage
