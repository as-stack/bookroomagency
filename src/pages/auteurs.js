import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
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
      auteurs: { 
        edges: auteurs 
      },
    }
  } = useStaticQuery(graphql`
    query {
      wpcontent {
    page( id: "auteurs" , idType: URI) {
      auteursPageMeta {
        auteursPageDescription
        auteursPageHeaderPicture {
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
    auteurs {
      edges {
        node {
          auteursMeta {
            voornaam
            achternaam
            publiekNaam
            geboortedatum
            geboorteplaats
            beschrijving
            uitgeverij
            regio
            profiel {
              altText
              sourceUrl
              imageFile {
                    childImageSharp {
                      fluid(quality: 50, grayscale: true) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
            }
          }
          slug
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
          <h2>We zijn een Bookroom-agency</h2>
          <p>{auteursPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="auteurs">
          <h2>Onze Auteurs</h2>
          <div className="auteur-items">
            {auteurs.map(({ node: { auteursMeta, slug } }) => (
              <Auteur to={`/${slug}`} key={slug}>
                <Image
                  fluid={auteursMeta.profiel.imageFile.childImageSharp.fluid}
                  alt={auteursMeta.profiel.altText}
                />
                <div className="auteur-info">
                  <p>
                    {auteursMeta.voornaam} {auteursMeta.achternaam}
                  </p>
                  {auteursMeta.profielNaam && <p>{auteursMeta.profielNaam}</p>}
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
