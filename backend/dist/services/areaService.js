"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArea = exports.updateArea = exports.createArea = exports.getAreaById = exports.getAllAreas = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllAreas = async () => {
    return db_1.default.area.findMany({
        include: {
            puestos: true
        }
    });
};
exports.getAllAreas = getAllAreas;
const getAreaById = async (id) => {
    return db_1.default.area.findUnique({
        where: { id_area: id },
        include: {
            puestos: true
        }
    });
};
exports.getAreaById = getAreaById;
const createArea = async (data) => {
    return db_1.default.area.create({
        data,
        include: {
            puestos: true
        }
    });
};
exports.createArea = createArea;
const updateArea = async (id, data) => {
    return db_1.default.area.update({
        where: { id_area: id },
        data,
        include: {
            puestos: true
        }
    });
};
exports.updateArea = updateArea;
const deleteArea = async (id) => {
    return db_1.default.area.delete({
        where: { id_area: id }
    });
};
exports.deleteArea = deleteArea;
