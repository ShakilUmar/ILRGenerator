function calculateMonthDifference(startDate, endDate) {
    let monthDifference = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    if (endDate.getDate() < startDate.getDate()) {
        monthDifference--;
    }

    return monthDifference;
}
