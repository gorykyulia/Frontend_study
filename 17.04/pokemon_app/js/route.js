"use strict";

function Route(name, htmlName, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.defaultRoute = defaultRoute;

}

Route.prototype.isActionRoute = function(hash) {
    return hash.replace(/#.*\//, "") === this.name;
}
