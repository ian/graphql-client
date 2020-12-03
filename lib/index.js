"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_request_1 = require("graphql-request");
var auth = null;
function makeRequest(url, body, variables, auth) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var client, res, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                client = new graphql_request_1.GraphQLClient(url, {
                                    mode: "cors",
                                });
                                if (auth)
                                    client.setHeader("Authorization", auth);
                                return [4 /*yield*/, client.request(graphql_request_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          ", "\n        "], ["\n          ", "\n        "])), body), variables)];
                            case 1:
                                res = _a.sent();
                                resolve(res);
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                reject(err_1.response);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function makeClient(url, opts) {
    var _this = this;
    if (opts === void 0) { opts = {}; }
    var setAuth = function (a) {
        auth = a;
    };
    var clearAuth = function () {
        auth = null;
    };
    var query = function (query, variables) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (process.env.GRAPHQL_DEBUG) {
                console.log("QUERY");
                console.log(query);
                console.log(JSON.stringify(variables, null, 2));
            }
            return [2 /*return*/, makeRequest(url, query, variables, auth)];
        });
    }); };
    var mutation = function (mutation, variables) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (process.env.GRAPHQL_DEBUG) {
                console.log("MUTATION");
                console.log(mutation);
                console.log(JSON.stringify(variables, null, 2));
            }
            return [2 /*return*/, makeRequest(url, mutation, variables)];
        });
    }); };
    return {
        query: query,
        mutation: mutation,
        setAuth: setAuth,
        clearAuth: clearAuth,
    };
}
exports.default = makeClient;
var templateObject_1;
