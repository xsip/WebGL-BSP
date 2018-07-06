"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// limit angle between min and max
function limitAngle(angle, min, max) {
    if (angle < min) {
        return min;
    }
    else if (angle > max) {
        return max;
    }
    else {
        return angle;
    }
}
exports.limitAngle = limitAngle;
//# sourceMappingURL=LimitAngle.js.map