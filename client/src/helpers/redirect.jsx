import React from "react";
import { useHistory, withRouter } from "react-router-dom";

const Redirect = (props) => { 
    const to = (props.to || '/');
    let history = useHistory();
    history.push(to);
    window.location.reload();
    return (<></>)
}
export default withRouter(Redirect);