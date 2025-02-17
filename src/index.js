"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const helmet_1 = __importDefault(require("helmet"));
const bodyParser = require("body-parser");
const index_1 = __importDefault(require("./database/index"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
index_1.default.connect((err) => {
    if (err) {
        console.log("error connecting to the database", err);
    }
    else {
        console.log("connect to the database");
    }
});
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM product`;
    const result = yield index_1.default.query(query);
    res.json({
        success: true,
        message: "data complete",
        data: result.rows
    });
}));
app.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, price } = req.body;
    const query = `INSERT INTO product (name, price) VALUES (${name}, ${price});`;
    const result = yield index_1.default.query(query);
    res.json({
        success: true,
        message: `ta ${req.body.id} idtai,  ${req.body.name} nertei, ${req.body.price} iim untei baraa uuslee`,
        data: result.rows
    });
}));
app.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM product WHERE id = ${req.body.id}`;
    const result = yield index_1.default.query(query);
    res.json({
        success: true,
        message: `tani ${req.body.id} iim dugaartai id ustlaa`,
        data: result.rows
    });
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server runing on port ${PORT}`);
}));
module.exports = app;
