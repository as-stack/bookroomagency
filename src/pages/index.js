import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  //Auteur,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
        homePageDescription,
        homePageFeaturedAuteurs,
        homePageHeaderDescription,
        homePageHeaderPicture,
        homePageHeaderTitle,
        
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
    page(idType: URI, id: "home") {
      homePageMeta {
        homePageDescription
        homePageHeaderDescription
        homePageHeaderTitle
        homePageHeaderPicture {
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
        homePageFeaturedAuteurs {
          ... on WPGraphql_Auteur {
            id
            slug
            auteursMeta {
              voornaam
              achternaam
              geboortedatum
              geboorteplaats
              beschrijving
              boeken{
                boek1 {
              altText
              sourceUrl
            }
            boek2 {
              altText
              sourceUrl
            }
            boek3 {
              altText
              sourceUrl
            }
              }
              regio
              publiekNaam
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
           
              uitgeverij
             
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
      <Seo title="Home" />
      <Wrapper>
        <div className="banner">
          <Image
            fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={homePageHeaderPicture.altText}
          />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageHeaderDescription}</p>
          </div>
          <BottomEdgeDown color={COLORS.BLACK} />
        </div>
        <div className="description">
          <p>{homePageDescription}</p>
          <BottomEdgeUp color={COLORS.PRIMARY} />
        </div>
        <div className="auteurs">
          <h2>Featured auteurs</h2>
          <div className="auteur-items">
            {homePageFeaturedAuteurs.map(({ Auteur, slug }) => (
              <Auteur key={slug} to={`/${slug}`}>
                <Image
                  fluid={Auteur.profiel.imageFile.childImageSharp.fluid}
                  alt={Auteur.profiel.altText}
                />
                <div className="auteur-info">
                  <p>
                    {Auteur.voornaam} {Auteur.achternaam}
                  </p>
                  <p>{Auteur.publiekNaam}</p>
                </div>
              </Auteur>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
