function calculateMonthDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  }

  function convertAcademicYear(input) {
    const baseYear = parseInt(input.substring(0, 2), 10);
  
    if (isNaN(baseYear)) {
      throw new Error("The first two characters must be numeric.");
    }
  
    const startYear = 2000 + baseYear;
    const endYear = startYear + 1;
  
    return `${startYear}-${endYear.toString().substring(2)}`;
  }
  


  export { convertAcademicYear, calculateMonthDifference };
