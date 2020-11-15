import { validate } from "class-validator";

export const validateClassObject = async (obj: Object) => {
  const validationErrors = await validate(obj);
  if (validationErrors.length > 0) {
    const errors = validationErrors.map((e) => {
      return {
        key: e.property,
        errors: Object.values(e.constraints || { msg: "Invalid" }),
      };
    });

    throw new ValidationError(errors);
  }
};

export class ValidationError extends Error {
  state: ValidationErrorInfo[];
  constructor(errors: ValidationErrorInfo[]) {
    super("The input is invalid");
    this.state = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export interface ValidationErrorInfo {
  key: string;
  errors: string[];
}

export default ValidationError;
