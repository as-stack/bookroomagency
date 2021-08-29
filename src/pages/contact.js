import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { RiMailSendFill, RiPhoneLine, RiUserLocationLine } from "react-icons/ri"
import Layout from "../components/layout"
import Seo from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const ContactPage = () => {
  const {
    wpcontent: {
      page: {
        contactPageMeta: {
            contactPageAddress,
            contactPageCity,
            contactPageDescription,
            contactPageEmail,
            contactPageLatitude,
            contactPageLongitude,
            contactPagePhone,
            contactPagePostcode,
            contactPageHeaderPicture,
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "contact", idType: URI) {
            contactPageMeta {
            contactPageAddress,
            contactPageCity,
            contactPageDescription,
            contactPageEmail,
            contactPageLatitude,
            contactPageLongitude,
            contactPagePhone,
            contactPagePostcode,
            contactPageHeaderPicture, {
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
      <Seo title="Contact" />
      <Wrapper descriptionColor={COLORS.PRIMARY}>
        <div className="banner">
          <Image
            fluid={contactPageHeaderPicture.imageFile.childImageSharp.fluid}
          />
          <BottomEdgeDown color={COLORS.PRIMARY} />
        </div>
        <div className="description">
          <h2>Contact Us</h2>
          <p>{contactPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="contact-info">
          <div>
            <RiMailSendFill style={{ height: "4rem", width: "4rem" }} />
            <p>
              Send us an email at{" "}
              <a target="__blank" href={`mailto:${contactPageEmail}`}>
                {contactPageEmail}
              </a>
            </p>
          </div>
          <div>
            <RiPhoneLine style={{ height: "4rem", width: "4rem" }} />
            <p>Call us: {contactPagePhone}</p>
          </div>
          <div>
            <RiUserLocationLine style={{ height: "4rem", width: "4rem" }} />
            <p>
              {contactPageAddress}, {contactPageCity}, {contactPagePostcode}, {contactPageLatitude}, {contactPageLongitude}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default ContactPage
