import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Wrapper, Image } from "./templateStyles/auteurStyles"

const auteurTemplate = ({
  data: {
    wpcontent: {
      auteur: {
       //auteur,
       auteursMeta,
        roles: { edges: roles },
      },
    },
  },
}) => {
  const { boek1, boek2, boek3 } = auteursMeta.boeken
  const boeken = [boek1, boek2, boek3]

  return (
    <Layout>
      <Seo title="auteurs" />
      <Wrapper>
        <div className="auteur-container">
          <div className="auteur-image">
            <Image
              fluid={auteursMeta.profiel.imageFile.childImageSharp.fluid}
              alt={auteursMeta.profiel.altText}
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
              {auteursMeta.voornaam} {auteursMeta.achternaam}
            </h2>
            {auteursMeta.publiekNaam ? (
              <h3>
                <span>{auteursMeta.publiekNaam} -</span> <span>{auteursMeta.regio}</span>
              </h3>
            ) : (
              <h3>{auteursMeta.regio}</h3>
            )}
            <p className="description">{auteursMeta.beschrijving}</p>
            <p className="info">
              <strong>geboortedatum:</strong> {auteursMeta.geboortedatum}
            </p>
            <p className="info">
              <strong>geboorteplaats:</strong> {auteursMeta.geboorteplaats}
            </p>
            <p className="info">
              <strong>uitgeverij:</strong> {auteursMeta.uitgeverij}
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
export default auteurTemplate


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
        id
      }
    }
  }
`
