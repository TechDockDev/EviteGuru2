import { Box, Typography } from "@mui/material";
import React from "react";

const TermsAndCondition = () => {
  return (
    <Box maxWidth={"800px"} margin={"auto"} pb={4}>
      <Box bgcolor={"#D9D9D9"}>
        <Typography
          p={3}
          variant="h1"
          fontSize={{ lg: "35px", md: "34px", sm: "30px", xs: "26px" }}
          textAlign={"center"}
          fontFamily={"Montserrat"}
          fontWeight={"bolder"}
        >
          TERMS & CONDITIONS
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          letterSpacing={"0.7px"}
          lineHeight={"27px"}
          textAlign="justify"
          //   width={{ xs: "100%", md: "75%" }}
          variant="body2"
          component={"p"}
          textOverflow={"ellipsis"}
        >
          By using or visiting the EviteGuru website or any EviteGuru products,
          softwares, data feeds, and services provided to you on, from, or
          through the EviteGuru website, you signify your agreement to these
          terms and conditions. If you do not agree to any of these terms please
          do not use the Service.
          <br />
          <br /> This Service is provided by EviteGuru on an "AS IS" and "AS
          AVAILABLE" basis and EviteGuru reserves the right to modify, suspend
          or discontinue the Service, in its sole discretion, at any time and
          without notice. You agree to be bound by such modifications. EviteGuru
          is and will not be liable to you for any modification, suspension or
          discontinuance of the Service.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Service ⚙️
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          These Terms of Service apply to all users of the Service, including
          users who are also contributors of Content on the Service. "Content"
          may include the text, software, graphics, photos, sounds, music,
          videos, audiovisual combinations, interactive features and other
          materials you may view on, access through, or contribute to the
          Service. The Service includes all aspects of EviteGuru , including but
          not limited to all products, software and services offered via the
          EviteGuru website and mobile devices applications. The Service may
          contain links to third party websites that are not owned or controlled
          by EviteGuru . EviteGuru has no control over, and assumes no
          responsibility for, the content, privacy policies, or practices of any
          third party websites. In addition, EviteGuru will not and cannot
          censor or edit the content of any third-party site. By using the
          Service, you expressly relieve EviteGuru from any and all liability
          arising from your use of any third-party website. Accordingly, we
          encourage you to be aware when you leave the Service and to read the
          terms and conditions and privacy policy of each other website that you
          visit.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Disclaimer of Warranties 📜
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          The service is provided 'as is'. EviteGuru and its suppliers,
          licensors and affiliate companies hereby disclaim all warranties of
          any kind, express or implied, including, without limitation, the
          warranties of merchantability, fitness for a particular purpose and
          non-infringement. Neither EviteGuru nor its suppliers and licensors,
          makes any warranty that the service will be error free or that access
          thereto will be continuous or uninterrupted. You understand that you
          download from at your own discretion and risk.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontWeight={"bolder"}
          variant={"h3"}
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          color={"#D18C4B"}
          mb={2}
        >
          General Use of the Service 💪
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          EviteGuru hereby grants you permission to access and use the Service
          as set forth in these Terms of Service, provided that you agree:
          <ul>
            <li>
              {/*<span>.</span> */}
              Not to the sale of access to the Service; the sale of advertising,
              sponsorships, or promotions placed on or within the Service or
              Content; or the sale of advertising, sponsorships, or promotions
              on any page of an ad- enabled blog or website containing Content
              delivered via the Service, unless other material not obtained from
              EviteGuru appears on the same page and is of sufficient value to
              be the basis for such sales.
            </li>
            <li>
              {/* {/*<span>.</span> */} You agree not to create posts, publish
              or distribute contents to EviteGuru of any kind that is, within
              the sole discretion of EviteGuru, determined to be commercial,
              illegal, offensive or potentially harmful to others including but
              not limited to content that: Infringes upon the rights of any
              third party, including but not limited to copyrights, trademarks,
              patents, trade secrets, design rights, moral rights or other third
              party proprietary rights, including privacy and publicity rights.
            </li>
            <li>
              {/*<span>.</span> */}
              Files/contents should not contain third party copyrighted
              material, or material that is subject to other third party
              proprietary rights, unless you have permission from the rightful
              owner of the material or you are otherwise legally entitled to
              post the material and to grant EviteGuru all of the license
              rights.
            </li>
            <li>
              {/*<span>.</span> */}
              Does not promote the infringement of copyright or other third
              party rights, e.g. providing a list of hyperlinks to websites that
              contain pirated software or media files, hacking/cracking, etc.{" "}
            </li>
            <li>
              {/*<span>.</span> */}
              Does not contain improper, incorrect and fake contents in any way
              that contents are with a different preview and incorrect title.{" "}
            </li>
            <li>
              {/*<span>.</span> */} Is duplicated or contains the same files and
              contents that already exist on EviteGuru.{" "}
            </li>
            <li>
              {/*<span>.</span> */} Contains software viruses or any other
              malicious computer code, files or programs designed to interrupt,
              destroy or alter the functionality of any computer software or
              hardware or telecommunications equipment owned by another party.{" "}
            </li>
            <li>
              {/*<span>.</span> */} Is offensive, abusive, threatening,
              harassing, stalking, promoting violence, racism, harm, hatred or
              bigotry against any group or individual; Is libelous, defamatory
              or promotes information that you know is false or illegal.{" "}
            </li>
            <li>
              {/*<span>.</span> */} Violates the privacy of others, including
              but not limited to posting the photograph of another person
              without that person's consent.{" "}
            </li>
            <li>
              {/*<span>.</span> */} Solicits information from anyone under the
              age of 18; Is pornographic, sexually explicit or contains nudity;
              Is or contains an advertisement, a marketing initiative,
              solicitation of a business, or otherwise significantly connected
              with any commercial purpose.{" "}
            </li>
            <li>
              {/*<span>.</span> */} Is unlawful or illegal, criminal or tortuous
              in nature (such as child pornography, fraud, gambling). In your
              use of the Service, you will comply with all applicable laws.
            </li>
          </ul>
          EviteGuru reserves the right to discontinue any aspect of the Service
          at any time.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Use of Content 🖼️
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          In addition to the general restrictions above, the following
          restrictions and conditions apply specifically to your use of Content.
          All brand, product and service names used in this Service which
          identify EviteGuru or third parties and their products and services
          are proprietary marks of EviteGuru and/or the relevant third parties.
          Nothing in this Service shall be deemed to confer on any person any
          license or right on the part of EviteGuru or any third party with
          respect to any such image, logo or name. Content is provided to you AS
          IS. You may access Content for your information, personal and
          commercial use solely as intended through the provided functionality
          of the Service and as permitted under these Terms of Service. You
          shall not download any Content unless you see a "download" or similar
          link displayed by EviteGuru on the Service for that Content. You shall
          not redistribute, sell, license, or otherwise exploit any Content.
          EviteGuru and its licensors reserve all rights not expressly granted
          in and to the Service and the Content. You agree not to circumvent,
          disable or otherwise interfere with security-related features of the
          Service or features that prevent or restrict use. You understand that
          when using the Service, you will be exposed to Content from a variety
          of sources, and that EviteGuru is not responsible for the accuracy,
          usefulness, safety, or intellectual property rights of or relating to
          such Content. You further understand and acknowledge that you may be
          exposed to Content that is inaccurate, offensive, indecent, or
          objectionable, and you agree to waive, and hereby do waive, any legal
          or equitable rights or remedies you have or may have against EviteGuru
          with respect thereto, and, to the extent permitted by applicable law,
          agree to indemnify and hold harmless EviteGuru, its owners, operators,
          affiliates, licensors, and licensees to the fullest extent allowed by
          law regarding all matters related to your use of the Service.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Content and Conduct 😇
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          As a EviteGuru account holder you may submit Content to the Service.
          You understand that EviteGuru does not guarantee any confidentiality
          with respect to any Content you submit. You shall be solely
          responsible for your own Content and the consequences of submitting
          and publishing your Content on the Service. You affirm, represent, and
          warrant that you own or have the necessary licenses, rights, consents,
          and permissions to publish Content you submit; and you license to
          EviteGuru all patent, trademark, trade secret, copyright or other
          proprietary rights in and to such Content for publication on the
          Service pursuant to these Terms of Service.
          <br />
          <br />
          You retain all of your ownership rights in your Content. However, by
          submitting Content to EviteGuru, you hereby grant EviteGuru a
          worldwide, non-exclusive, royalty-free, sub-licenseable and
          transferable license to use, reproduce, distribute, prepare derivative
          works of, display, and perform the Content in connection with the
          Service and EviteGuru (and its successors' and affiliates') business,
          including without limitation for promoting and redistributing part or
          all of the Service (and derivative works thereof) in any media formats
          and through any media channels. You also hereby grant each user of the
          Service a non-exclusive license to access your Content through the
          Service, and to use, reproduce, distribute, display and perform such
          Content as permitted through the functionality of the Service and
          under these Terms of Service. The above licenses granted by you in
          Content you submit to the Service terminate within a commercially
          reasonable time after you remove or delete your Content from the
          Service. You understand and agree, however, that EviteGuru may retain,
          but not display, distribute, or perform, server copies of your Content
          that have been removed or deleted.
          <br />
          <br />
          You further agree that Content you submit to the Service will not
          contain third party copyrighted material, or material that is subject
          to other third party proprietary rights, unless you have permission
          from the rightful owner of the material or you are otherwise legally
          entitled to post the material and to grant EviteGuru all of the
          license rights granted herein.
          <br />
          <br />
          EviteGuru does not endorse any Content submitted to the Service by any
          user or other licensor, or any opinion, recommendation, or advice
          expressed therein, and EviteGuru expressly disclaims any and all
          liability in connection with Content. EviteGuru does not permit
          copyright infringing activities and infringement of intellectual
          property rights on the Service, and EviteGuru will remove all Content
          if properly notified that such Content infringes on another's
          intellectual property rights. EviteGuru reserves the right to remove
          Content without prior notice. EviteGuru has no ability to control the
          Content you may upload, post or otherwise transmit using the Service
          and does not have any obligation to monitor such Content for any
          purpose. You acknowledge that you are solely responsible for all
          Content and material you upload, post or otherwise transmit using the
          Service.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Account Termination ❌
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          EviteGuru will terminate a user's access to the Service if, under
          appropriate circumstances, the user is determined to be a repeat
          infringer. EviteGuru reserves the right to decide whether Content
          violates these Terms of Service for reasons other than copyright
          infringement, such as, but not limited to, pornography, obscenity.
          EviteGuru may at any time, without prior notice and in its sole
          discretion, remove such Content and/or terminate a user's account for
          submitting such material in violation of these Terms of Service.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Ability to Accept Terms of Service ✍️
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          You affirm that you are either more than 18 years of age, or an
          emancipated minor, or possess legal parental or guardian consent, and
          are fully able and competent to enter into the terms, conditions,
          obligations, affirmations, representations, and warranties set forth
          in these Terms of Service, and to abide by and comply with these Terms
          of Service.
        </Typography>
      </Box>
      <Box p={2}>
        <Typography
          fontSize={{ xs: "30px", md: "34px", lg: "36px" }}
          fontWeight={"bolder"}
          variant="h3"
          color={"#D18C4B"}
          mb={2}
        >
          Assignment 📑
        </Typography>
        <Typography
          variant="body"
          component={"p"}
          letterSpacing={"0.6px"}
          lineHeight={"25px"}
          textAlign="justify"
          fontFamily={"Montserrat"}
        >
          These Terms of Service, and any rights and licenses granted here
          under, may not be transferred or assigned by you, but may be assigned
          by EviteGuru without restriction.
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsAndCondition;
