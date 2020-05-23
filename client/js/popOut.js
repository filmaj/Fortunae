const electron = require("electron");
const { ipcRenderer } = electron;

export default class PopOut {
  static openFund() {
    ipcRenderer.send("fund:open");
  }

  static openSankey() {
    ipcRenderer.send("sankey:open");
  }

  static openSpider() {
    ipcRenderer.send("spider:open");
  }

  static openBurndown() {
    ipcRenderer.send("burndown:open");
  }

  static openChildWindow() {
    console.log(
      "this is where we need to pass parent -> child window refresh1"
    );
    const electron = require("electron");
    const { ipcRenderer } = electron;
    ipcRenderer.send("window:open");
  }

  static refreshChildWindows() {
    const electron = require("electron");
    const { ipcRenderer } = electron;
    ipcRenderer.send("window:refresh");
  }
}
