import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Auteur,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const AuteursPage = () => {
  const {
    wpcontent: {
      page: {
        auteursPageMeta: { auteursPageDescription, auteursPageHeaderPicture },
      },
      auteurs: { edges: auteurs },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "auteurs", idType: URI) {
      aboutUsPageMeta {
        aboutUsDescription
        aboutUsPageHeaderPicture {
          altText
          sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
             
            }
          }
        }
   
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Auteurs" />
      <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={auteursPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={auteursPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are Obi Agency</h2>
          <p>{auteursPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="auteurs">
          <h2>Our Artists</h2>
          <div className="auteur-items">
            {auteurs.map(({ node: { auteurs, slug } }) => (
              <Auteur to={`/${slug}`} key={slug}>
                <Image
                  fluid={auteurs.profiel.imageFile.childImageSharp.fluid}
                  alt={auteurs.profiel.altText}
                />
                <div className="auteur-info">
                  <p>
                    {auteurs.firstName} {auteurs.lastName}
                  </p>
                  {auteurs.artistName && <p>{auteurs.artistName}</p>}
                </div>
              </Auteur>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AuteursPage
