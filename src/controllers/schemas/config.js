import { z } from "zod";

z.setErrorMap((issue, ctx) => {
  if (issue.code === "unrecognized_keys") {
    return {
      message: `Some provided fields are not allowed: ${issue.keys.join(", ")}`,
    };
  }

  return { message: ctx.defaultError };
});
