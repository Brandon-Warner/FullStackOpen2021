"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientData_1 = __importDefault(require("../../data/patientData"));
const getPatients = () => {
    return patientData_1.default;
};
const getNonSensitiveInfoPatients = () => {
    return patientData_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatients = () => {
    return null;
};
exports.default = {
    getPatients,
    addPatients,
    getNonSensitiveInfoPatients
};
