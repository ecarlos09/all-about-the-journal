function byRecent(entries) {
    entries.sort((a,b) => {
        return (new Date(a.date) - new Date(b.date))
    });
    return entries;
}

function byOldest(entries) {
    entries.sort((a,b) => {
        return -(new Date(a.date) - new Date(b.date))
    });
    return entries;
}

function byReacts(entries) {
    entries.sort((a,b) => {
        const adder = (sum, next) => sum + next;
        return a.reacts.reduce(adder) - b.reacts.reduce(adder);
    });
    return entries;
}

function byComments(entries) {
    entries.sort((a,b) => {
        return a.comments.length - b.comments.length;
    });
    return entries;
}

module.exports = {byRecent, byOldest, byReacts, byComments}

