import {subdomainList} from "./constant.js";

export const getApps = () => {
    const subdomain = getSubDomain(window.location.hostname);
    const mainApp = subdomainList.find((app) => app.main);
    if(subdomain == "") return mainApp.app;
    const apps = subdomainList.find((app) => subdomain === app.subdomain);
    return apps ? apps.app : mainApp.app;

}
export const getSubDomain = (location) => {
    const locationParts = location.split(".");
    const isLocalHost = locationParts.slice(-1)[0] === "localhost";
    const sliceTill = isLocalHost ? -1 : -2;
    return locationParts.slice(0,sliceTill).join("");
}