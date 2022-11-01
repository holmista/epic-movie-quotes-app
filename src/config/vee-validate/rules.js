import { defineRule } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("lower", (value) => {
  return value.toLowerCase() === value;
});
defineRule("same", (value, otherValue) => {
  return value === otherValue[0];
});
