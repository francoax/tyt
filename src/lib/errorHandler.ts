import { Prisma } from "@prisma/client";
import { ServerActionResponse } from "./definitions";
import { ERROR_STATUS } from "./constants";

type ErrorObject = {
  message: string;
  status: string;
};

type Errors = {
  [code: string]: ErrorObject;
};

const codeErrors: Errors = {
  P2000: {
    message: "El valor dado es muy grande.",
    status: ERROR_STATUS,
  },
  P2001: {
    message: "No pudo encontrarse dicho registro.",
    status: ERROR_STATUS,
  },
  P2002: {
    message: "Ya existe un registro con dichos dato/s.",
    status: ERROR_STATUS,
  },
  P2006: {
    message: "El tipo de dato que quiere ingresarse no corresponde.",
    status: ERROR_STATUS,
  },
};

export default function HandleError(error: unknown): ServerActionResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (codeErrors[error.code]) {
      const target = (error.meta?.target as Array<string>).reduce(
        (acc: { [key: string]: string[] | undefined }, item) => {
          acc[item] = [""];
          return acc;
        },
        {},
      );

      return {
        ...codeErrors[error.code],
        errors: target,
      };
    } else {
      return {
        message: "No pudo completarse la operacion.",
        status: ERROR_STATUS,
      };
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      message: "Ocurrio un error desconocido.",
      status: ERROR_STATUS,
    };
  }

  return {
    message: "Ocurrio un error inesperado.",
    status: ERROR_STATUS,
  };
}
