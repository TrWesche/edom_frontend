import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StreamBrowser from "./StreamBrowser";
import UserBrowser from "./UserBrowser";
import ChatWindow from "./ChatWindow";

const RoomMenu = () => {
  return (
    <div>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Stream Browser</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <StreamBrowser />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>User Browser</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <UserBrowser />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>Chat Window</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ChatWindow />
            </AccordionDetails>
        </Accordion>
        <Accordion disabled>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
            >
                <Typography>Admin Tools (Only shows for Admin)</Typography>
            </AccordionSummary>
        </Accordion>
    </div>
  );
}

export default RoomMenu;