import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/auteurStyles"

const AuteurTemplate = ({
  data: {
    wpcontent: {
      auteur: {
        auteur,
        roles: { edges: roles },
      },
    },
  },
}) => {
  const { boek1, boek2, boek3 } = auteur.boeken
  const boeken = [boek1, boek2, boek3]

  return (
    <Layout>
      <Seo title="Auteur" />
      <Wrapper>
        <div className="auteur-container">
          <div className="auteur-image">
            <Image
              fluid={auteur.profile.imageFile.childImageSharp.fluid}
              alt={auteur.profile.altText}
            />
            <div className="roles">
              {roles.map(({ node: role }) => (
                <div key={role.name} className="role">
                  {role.name}
                </div>
              ))}
            </div>
          </div>
          <div className="auteur-info">
            <h2>
              {auteur.voornaam} {auteur.achternaam}
            </h2>
            {auteur.publiekNaam ? (
              <h3>
                <span>{auteur.publiekNaam} -</span> <span>{auteur.regio}</span>
              </h3>
            ) : (
              <h3>{auteur.regio}</h3>
            )}
            <p className="description">{auteur.beschrijving}</p>
            <p className="info">
              <strong>geboortedatum:</strong> {auteur.geboortedatum}
            </p>
            <p className="info">
              <strong>geboorteplaats:</strong> {auteur.geboorteplaats}
            </p>
            <p className="info">
              <strong>uitgeverij:</strong> {auteur.uitgeverij}
            </p>
            
          </div>
        </div>
        <div className="auteur-boeken">
          {boeken.map((boek, i) => (
            <div key={i} className="auteur-picture">
              <Image
                fluid={boek.imageFile.childImageSharp.fluid}
                alt={boek.altText}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </Layout>
  )
}

export default AuteurTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      auteur(id: $id, idType: ID) {
        roles {
          edges {
            node {
              name
            }
          }
        }
        id
        auteursMeta{
          voornaam
          achternaam
          publiekNaam
          beschrijving
          geboortedatum
          geboorteplaats
          regio
          uitgeverij
          profiel {
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
          boeken {
            boek1 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            boek2 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
            boek3 {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 75) {
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
  }
`
