const validate = require("validate.js");

export class ValidationPlugin {
	type: string;
	param: string;

	constructor(private params: any = {}) {
		this.type = "middleware";
	}

	run(req: any, res: any, route: any): Boolean {
		const validation = validate(req.body, route.target[route.method.methodName].validations);

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

	add(configParam: any, route: any): void {
		const validations = route.target[route.method.methodName].validations;

		if (validations) configParam.validations = validations;
	}
}

export function Validation(validations: any): Function {
  return function(target: any, method: string, descriptor: PropertyDescriptor): void {
    target[method].validations = validations;
  };
}