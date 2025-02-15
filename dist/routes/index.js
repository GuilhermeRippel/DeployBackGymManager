"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gymCadastro_1 = __importDefault(require("./gymCadastro"));
const express_1 = __importDefault(require("express"));
const RouterAplication = express_1.default.Router();
RouterAplication.use("/gym", gymCadastro_1.default);
exports.default = RouterAplication;
