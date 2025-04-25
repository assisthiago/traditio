const ERROR_MESSAGES = {
  400: {
    username: {
      error: "Um usuário com este nome de usuário já existe.",
      message: "E-mail já cadastrado.",
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
