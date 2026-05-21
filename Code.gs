function doGet(e) {
  // Determine role and room from URL parameters
  // Example: .../exec?role=black&room=chess123
  var role = e.parameter.role || 'white';
  var room = e.parameter.room || 'lobby-1';
  
  var template = HtmlService.createTemplateFromFile('Index');
  
  // Pass variables to the frontend template
  template.role = role.toLowerCase();
  template.room = room;
  
  return template.evaluate()
      .setTitle('OpenChess - Professional Multiplayer')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Inclusion helper (optional if keeping monolithic)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
