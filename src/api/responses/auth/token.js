const ERROR_MESSAGES = {
  400: {
    non_field_errors: {
      error: "Impossível fazer login com as credenciais fornecidas.",
      message: "E-mail ou senha incorreta.",
    }
  }
}

export const catchError = (error) => {
  const { data, status } = error.response;
  let errors = [];
  Object.entries(data)
    .map(([key, messages]) => {
      messages.map(message => {
        if (ERROR_MESSAGES[status][key]?.error === message)
          errors.push(ERROR_MESSAGES[status][key].message);
        else errors.push(message);
      });
    });
  return errors;
};
