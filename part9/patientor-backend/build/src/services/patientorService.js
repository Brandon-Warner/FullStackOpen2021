"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnosesData_1 = __importDefault(require("../../data/diagnosesData"));
const getDiagnoses = () => {
    return diagnosesData_1.default;
};
const addDiagnoses = () => {
    return null;
};
exports.default = {
    getDiagnoses,
    addDiagnoses
};
