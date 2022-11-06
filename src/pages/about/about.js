import { getApiCategory } from "../../scripts/util";

import "../../main.scss";
import "./about.scss";

console.log("--> about.js loaded");

getApiCategory('music').then(data => console.log(data)).catch(err => console.log(err));
getApiCategory('movies').then(data => console.log(data)).catch(err => console.log(err));
getApiCategory('games').then(data => console.log(data)).catch(err => console.log(err));