"use strict";
// IIFE to preserve code scope
(function () {
    var NotificationPlatform;
    (function (NotificationPlatform) {
        NotificationPlatform["SMS"] = "SMS";
        NotificationPlatform["EMAIL"] = "EMAIL";
        NotificationPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlatform || (NotificationPlatform = {}));
    var UUID = function () {
        return (Math.random() + 1).toString(36).substring(7);
    };
    var dataUtils = {
        tomorrow: function () {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today: function () {
            return new Date();
        },
        formatDate: function (date) {
            return date.toLocaleDateString();
        },
    };
    var Riminder = /** @class */ (function () {
        function Riminder(description, date, notifications) {
            this.id = UUID();
            this.dateCreated = dataUtils.today();
            this.dateUpdated = dataUtils.today();
            this.description = "";
            this.date = dataUtils.today();
            this.notifications = [NotificationPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Riminder.prototype.render = function () {
            return "\n        ---> RIMINDER <---\n        Description: ".concat(this.description, "\n        date: ").concat(dataUtils.formatDate(this.date), "\n        platforms: ").concat(this.notifications.join(", "), "\n      ");
        };
        return Riminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = UUID();
            this.dateCreated = dataUtils.today();
            this.dateUpdated = dataUtils.today();
            this.description = "";
            this.done = false;
            this.description = description;
        }
        Todo.prototype.render = function () {
            return "\n        ---> TODO <---\n        Description: ".concat(this.description, "\n        done: ").concat(this.done, "\n      ");
        };
        return Todo;
    }());
    // Mocks
    var todoMock = new Todo("Todo criado com a classe");
    var reminderMock = new Riminder("Riminder criado com a classe", new Date(), [NotificationPlatform.EMAIL]);
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
                var textNode = document.createTextNode(JSON.stringify(task.render()));
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
