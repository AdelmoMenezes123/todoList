"use strict";
// IIFE to preserve code scope
(function () {
    // Mocks
    var todoMock = {
        description: "Help mark with code testing",
        done: false,
    };
    var reminderMock = {
        description: "My brother's bday",
        date: "15.09.2021",
    };
    var taskView = {
        render: function (tasks) {
            // Clear view
            var tasksList = document.getElementById("tasksList");
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            // Render Tasks
            tasks.forEach(function (task) {
                var li = document.createElement("LI");
                var textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    // Controllers
    var TaskController = function (view) {
        var _a;
        var tasks = [todoMock, reminderMock];
        var handleTaskCreate = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.getElementById("taskForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleTaskCreate);
    };
    TaskController(taskView);
})();
