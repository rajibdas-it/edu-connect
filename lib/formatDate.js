export const formatDat = (date) => {
    let option = {
        year: "numeric",
        month: "short",
        day: "numeric"
    }
    const formatteddate = new Intl.DateTimeFormat("en-US", option).format(date);
    return formatteddate;

}