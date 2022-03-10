import {
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const FAQItem = (props) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left" fontSize="md" fontWeight="bold">
          {props.title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>{props.des}</AccordionPanel>
  </AccordionItem>
);
export function FAQ() {
  const { t } = useTranslation("common");
  return (
    <Accordion allowToggle>
      <FAQItem
        title={t("faq.title1")}
        des={
          <div
            dangerouslySetInnerHTML={{
              __html: t("faq.des1", { interpolation: { escapeValue: false } }),
            }}
          />
        }
      />
      <FAQItem
        title={t("faq.title2")}
        des={
          <div
            dangerouslySetInnerHTML={{
              __html: t("faq.des2", { interpolation: { escapeValue: false } }),
            }}
          />
        }
      />
      <FAQItem
        title={t("faq.title3")}
        des={
          <div
            dangerouslySetInnerHTML={{
              __html: t("faq.des3", { interpolation: { escapeValue: false } }),
            }}
          />
        }
      />
      <FAQItem
        title={t("faq.title4")}
        des={
          <div
            dangerouslySetInnerHTML={{
              __html: t("faq.des4", { interpolation: { escapeValue: false } }),
            }}
          />
        }
      />
    </Accordion>
  );
}
