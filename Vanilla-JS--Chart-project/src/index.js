import "./reset.css";
import "./scss/basics.scss";
import "./scss/variables.scss";
import "./scss/components/container.scss";
import "./scss/components/chart.scss";
import "./scss/components/charts-list.scss";
import "./scss/components/interface.scss";
import "./scss/components/table-section.scss";

import Model from "./js/model";
import View from "./js/view";
import Controller from "./js/controller";

const model = new Model();
const view = new View();
new Controller(model, view);


