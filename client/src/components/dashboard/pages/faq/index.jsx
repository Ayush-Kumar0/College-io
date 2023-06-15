import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Your Posts" subtitle="Recently Created Post" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Post:1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Anyone up for cofee
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
           Post:2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Anyone up for a football match
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Post:3
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Anyone up for a movie?
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Post:4
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Anyone up for Anime?
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Post:5
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Anyone has stycky tapes?
           </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;