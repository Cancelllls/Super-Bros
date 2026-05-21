function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Super Mario Bros - Full Game')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}