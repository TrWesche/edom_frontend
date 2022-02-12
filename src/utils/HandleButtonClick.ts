import { useNavigate } from 'react-router-dom';

interface ButtonClickEvent extends React.FormEvent<HTMLButtonElement> {
    target: ButtonClickTarget
};

interface ButtonClickTarget extends EventTarget {
    href?: string
};

const HandleButtonClick = (e: ButtonClickEvent) => {
    const navigate = useNavigate();

    e.preventDefault();
    
    if (e.target.href !== undefined) {
        const destURL = new URL(e.target.href);
        if (destURL.hostname !== "localhost") { // TODO: This should be replaced with a variable
            window.open(e.target.href, '_blank');
        } else {
            navigate(`${destURL.pathname}${destURL.search}`);
        }
    } else {
        console.log("Error, destination not defined")
    }
};

export default HandleButtonClick;