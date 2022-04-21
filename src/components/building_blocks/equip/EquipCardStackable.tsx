// Library Imports
import React, { useState, MouseEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

// Material UI Function Imports
import {
  styled,
  useTheme
} from '@mui/material'

// Material UI Component Imports
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Typography,
  Collapse
} from '@mui/material'

// Material UI Typescript Properties Imports
import {
  IconButtonProps
} from '@mui/material'

// Material UI Icon Imports
import {
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'

// Interface Imports
import { ReturnEquipObject } from '../../../interfaces/edomEquipInterfaces';


interface ClickEvent extends MouseEvent<HTMLButtonElement> {
  target: ClickTarget
};

interface ClickTarget extends EventTarget {
  href?: string
};

const handleClick = (e: ClickEvent, navigate: NavigateFunction, target: string) => {
  e.preventDefault();
  if (target !== "") {
      navigate(target);
  } else {
      console.log("Error, destination not defined")
  }
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function EquipCardStackable(data: ReturnEquipObject, navigate: NavigateFunction) {
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  return (
    <Card sx={{ display: 'flex' }}>
      <CardHeader
        action={
          data.edit_permissions ?
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          :
            <React.Fragment />
        }
        title={`${data.name}`}
        subheader={`${data.category}`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardActionArea onClick={(e) => handleClick(e, navigate, `/equip/${data.id}`)}>
            <CardContent
                sx={{
                    height: '50',
                    textOverflow: 'ellipsis' 
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {data.headline}
                </Typography>
            </CardContent>
          </CardActionArea>
      </Box>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
