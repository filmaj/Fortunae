export default class SettingsItem {
  constructor(
    language,
    foregroundColor,
    backgroundColor,
    alertColor,
    confirmationColor
  ) {
    this.language = language;
    this.foregroundColor = foregroundColor;
    this.backgroundColor = backgroundColor;
    this.alertColor = alertColor;
    this.confirmationColor = confirmationColor;
  }
}
