// IIFE to preserve code scope
(() => {
  interface Task {
    id: string;
    dateCreated: Date;
    dateUpdated: Date;
    description: string;
    render(): string;
  }

  class Riminder implements Task {
    id: string = "";
    dateCreated: Date = new Date();
    dateUpdated: Date = new Date();
    description: string = "";

    date: Date = new Date();
    notifications: Array<string> = ["EMAIL"];

    constructor(description: string, date: Date, notifications: Array<string>) {
      this.description = description;
      this.date = date;
      this.notifications = notifications;
    }
    render(): string {
      return JSON.stringify(this);
    }
  }

  class Todo implements Task {
    id: string = "";
    dateCreated: Date = new Date();
    dateUpdated: Date = new Date();
    description: string = "";

    done: boolean = false;

    constructor(description: string) {
      this.description = description;
    }
    render(): string {
      return JSON.stringify(this);
    }
  }

  // Mocks
  const todoMock = new Todo("Todo criado com a classe");
  const reminderMock = new Riminder("Riminder criado com a classe", new Date(), ["EMAIL"]);

  const taskView = {
    render(tasks: Array<Task>) {
      // Clear view
      const tasksList = document.getElementById("tasksList");
      while (tasksList?.firstChild) {
        tasksList.removeChild(tasksList.firstChild);
      }

      // Render Tasks
      tasks.forEach((task) => {
        const li = document.createElement("LI");
        const textNode = document.createTextNode(JSON.stringify(task.render()));
        li.appendChild(textNode);
        tasksList?.appendChild(li);
      });
    },
  };

  // Controllers
  const TaskController = (view: typeof taskView) => {
    const tasks: Array<Task> = [todoMock, reminderMock];

    const handleTaskCreate = (event: Event) => {
      event.preventDefault();
      view.render(tasks);
    };

    document.getElementById("taskForm")?.addEventListener("submit", handleTaskCreate);
  };

  TaskController(taskView);
})();
