import HistoryChart from "./historyChart.js";

const fs = require("fs");
const { getCurrentWindow, globalShortcut } = require("electron").remote;
const database = "/db/";
export default class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      this.loadDatabase();
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
      this.loadDatabase();
    }
    return items;
  }

  static loadDatabase() {
    fs.readdir(__dirname + database, (err, files) => {
      let filesDirectory = [];
      files.forEach((file) => {
        filesDirectory.push(file);
        console.log(filesDirectory);
      });

      filesDirectory.sort(function (a, b) {
        // this sort isn't working as expected
        return new Date(Date.now(b)) - new Date(Date.now(a));
      });

      localStorage.setItem("history", JSON.stringify(filesDirectory));

      const recentFile = filesDirectory[0];
      let rawData = fs.readFileSync(__dirname + database + recentFile);
      let items = JSON.parse(rawData);
      localStorage.setItem("items", JSON.stringify(items));
      HistoryChart.loadHistoryChart();
    });
  }

  static restoreItems(timestamp) {
    let rawData = fs.readFileSync(__dirname + database + timestamp);
    // console.log(rawData);
    let items = JSON.parse(rawData);
    // console.log(items);
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));

    // this is an intense way to reload the window, need to find a different solution
    getCurrentWindow().reload();
  }

  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static removeItem(id) {
    const items = Store.getItems();
    items.forEach((item, index) => {
      if (item.id === id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }

  static saveJSON() {
    const fileName = Date.now();
    let items = JSON.parse(localStorage.getItem("items"));
    const json = JSON.stringify(items);
    fs.writeFile(__dirname + "/db/" + fileName, json, "utf8", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      alert("file saved");
    });

    // this.saveHistory(fileName);
  }
}
