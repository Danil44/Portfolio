import "./reset.css";
import "./scss/basics.scss";
import "./scss/variables.scss";
import "./scss/components/input-form.scss";
import "./scss/components/background.scss";
import "./scss/components/note__item.scss";
import "./scss/components/modal-window.scss";
import "./scss/components/spinner.scss";
import "./scss/components/modal-question.scss";
import "./scss/components/container.scss";

import Model from "./js/model";
import View from "./js/view";
import Controller from "./js/controller";

const model = new Model();
const view = new View();
new Controller(model, view);
