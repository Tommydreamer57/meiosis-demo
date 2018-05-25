
// DEEP COPY
function deepCopy(obj) {
    if (!obj) return obj;
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number') return obj;
    let newObj = {};
    if (Array.isArray(obj)) newObj = [];
    for (let key in obj) {
        newObj[key] = deepCopy(obj[key]);
    }
    return newObj;
}

// COMPARE CHANGES
function compare(old, neww) {
    let differences = {};
    if (!neww) return neww;
    let newKeys = [];
    for (let key in neww) {
        newKeys.push(key);
        if ((!old || !(key in old)) || (typeof neww[key] !== typeof old[key])) {
            differences[key] = neww[key];
        } else if (typeof neww[key] === "object" && neww[key] !== null) {
            differences[key] = compare(old[key], neww[key]);
            if (differences[key] && !Object.keys(differences[key]).length) {
                delete differences[key];
            }
        } else if (neww[key] !== old[key]) {
            differences[key] = neww[key];
        }
    }
    if (old) {
        for (let key in old) {
            if (neww && !(key in neww)) {
                differences[key] = "DELETED";
            }
        }
    }
    return differences;
}

// WATCH CHANGES IN MODEL
export function watch() {
    let oldCopy, currentCopy;
    return function (newModel) {
        console.log("NEW MODEL");
        console.log(newModel);
        // TRACK PREVIOUS MODELS - COPY NEW MODELS TO MAINTAIN IMMUTABILITY
        [oldCopy, currentCopy] = [currentCopy, deepCopy(newModel)];
        // COMPUTE DIFFERENCES
        let differences = compare(oldCopy, currentCopy);
        // TRACE SOURCE OF UPDATE IF NO DIFFERENCES MADE
        if (Object.keys(differences).length) {
            console.log("DIFFERENCES:");
            console.log(differences);
        } else {
            console.log("NO DIFFERENCES:");
            console.trace(newModel);
        }
    }
}