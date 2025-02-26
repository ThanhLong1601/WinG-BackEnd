"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDto = toUserDto;
function toUserDto(user) {
    return {
        uid: user.uid,
        phone: user.phone,
        isKkhPatient: user.isKkhPatient,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        ethnicity: user.ethnicity,
        currentOccupation: user.currentOccupation,
        highestAttainedEducation: user.highestAttainedEducation,
        hasPregnancies: user.hasPregnancies,
        vaginalDeliveries: user.vaginalDeliveries,
        caesareanSections: user.caesareanSections,
        miscarriages: user.miscarriages,
    };
}
//# sourceMappingURL=user.dto.js.map