// Resources Used:
// https://www.telerik.com/blogs/understand-react-context-api
// https://stackoverflow.com/questions/65889422/context-provider-in-typescript#:~:text=Generally%20you%20would%20want%20to%20type%20your%20context%2C,the%20consumer%20of%20LoadContext%20the%20types%20are%20known.
// https://www.becomebetterprogrammer.com/typescript-pass-function-as-a-parameter/#:~:text=Similar%20to%20JavaScript%2C%20to%20pass%20a%20function%20as,calling%20the%20foo%20function%20in%20the%20following%20example%3A

import { 
    createContext, 
    useState,
    useContext,
    FC } from "react";

import  { Snackbar, Alert } from "@mui/material";

import { AlertValueObjectProps } from "../interfaces/globalInterfaces";

interface context {
    data: AlertValueObjectProps
    alertSetter?: Function
};

const onLoadAlertValue: AlertValueObjectProps = {
    open: false,
    content: '',
    severity: 'success'
};

const onLoadContext: context = {
    data: onLoadAlertValue,
    alertSetter: undefined
};


const AlertContext = createContext(onLoadContext);

const AlertProvider: FC = ({children}) => {
    const [alertValues, setAlertValues] = useState(onLoadAlertValue);

    const data: context = {
        data: alertValues,
        alertSetter: setAlertValues
    };

    // Event Handlers
    const handleAlertClose = (e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        };
    
        setAlertValues({...alertValues, open: false});
    };
    
    
    const handleAlertOpen = () => {
        return (
          <Snackbar 
            open={alertValues.open} 
            autoHideDuration={6000} 
            onClose={handleAlertClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          >
            <Alert onClose={handleAlertClose} severity={alertValues.severity}>
              {alertValues.content}
            </Alert>
          </Snackbar>
        )
    };

    return (
        <AlertContext.Provider value={data}>
            {handleAlertOpen()}
            { children }
        </AlertContext.Provider>
    );
};

const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
      throw new Error("useAlert can only be used inside AlertProvider");
    }
    return context;
};

export {
    AlertProvider,
    useAlert
};