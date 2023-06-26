"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObject = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            let prevPriceObj = {};
            if (key === 'minPrice' || key === 'maxPrice') {
                prevPriceObj = Object.assign({}, (finalObject === null || finalObject === void 0 ? void 0 : finalObject.price) || {});
            }
            if (key === 'minPrice') {
                finalObject['price'] = Object.assign(Object.assign({}, prevPriceObj), { $gte: obj[key] });
            }
            else if (key === 'maxPrice') {
                finalObject['price'] = Object.assign(Object.assign({}, prevPriceObj), { $lte: obj[key] });
            }
            else {
                finalObject[key] = obj[key];
            }
        }
    }
    return finalObject;
};
exports.default = pick;
