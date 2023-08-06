function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    let modifiedContent = [];
  
    const convertToHTMLPosition = (() => {
      const initialPosition = htmlContent.indexOf(plainText);
      return (plainTextPosition) => {
        const { start, end } = plainTextPosition;
        const startHTMLPosition = initialPosition + start;
        return { start: startHTMLPosition, end: startHTMLPosition + (end - start) };
      };
    })();
  
    let lastIndex = 0;
    plainTextPositions.forEach((plainTextPosition) => {
      const { start: startHTMLPosition, end: endHTMLPosition } = convertToHTMLPosition(plainTextPosition);
      modifiedContent.push(htmlContent.slice(lastIndex, startHTMLPosition));
      modifiedContent.push(`<mark>${htmlContent.slice(startHTMLPosition, endHTMLPosition)}</mark>`);
      lastIndex = endHTMLPosition;
    });
  
    modifiedContent.push(htmlContent.slice(lastIndex));
  
    return modifiedContent.join('');
  }
  
  module.exports = highlightHTMLContent;