const validate = require("validate.js");

export class ValidationPlugin {
	constructor(private params: any = {}) {}

	run(req: any, res: any, target: any, method: any): Boolean {
		const validation = validate(req.body, target[method].validations);

		if (validation)	{
			res.status(this.params.status || 422).send({
				error: {
					message: this.params.message || "validation error",
					parameters: validation
				}
			});

			return true;
		}

		return false;
	}
}

export function Validation(validations: any): Function {
  return function(target: any, method: string, descriptor: PropertyDescriptor): void {
    target[method].validations = validations;
  };
}