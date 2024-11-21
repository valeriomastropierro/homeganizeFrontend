import React from "react";
import { useLocation } from "react-router-dom";


export function Page404() {
    let location = useLocation();
    return (
            <h1>error 404, page not found at {location.pathname}</h1>
    )
}