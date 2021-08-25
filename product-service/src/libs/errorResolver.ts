import { formatJSONErrorResponse } from "@libs/apiGateway";

export function sendError(error, code) {
  return formatJSONErrorResponse(
    {
      message: error.toString(),
    },
    code
  );
}

export function ParamException(message) {
  this.message = message;
  this.name = "ParamException";
}

ParamException.prototype.toString = function () {
  return `${this.name}: "${this.message}"`;
};

export function ProductException(message) {
  this.message = message;
  this.name = "ProductException";
}

ProductException.prototype.toString = function () {
  return `${this.name}: "${this.message}"`;
};
