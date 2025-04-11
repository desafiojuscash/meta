export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(email)) {
    return {
      valid: false,
      error: "Formato de e-mail inválido.",
    };
  }
  return {
    valid: true,
    error: "",
  };
};

export const validatePassword = (password, confirmPassword = null) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("A senha deve ter no mínimo 8 caracteres.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra minúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("A senha deve conter pelo menos um número.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>+=\-[\]~]/.test(password)) {
    errors.push("A senha deve conter pelo menos um caractere especial.");
  }
  if (confirmPassword !== null && password !== confirmPassword) {
    errors.push("A senha e a confirmação não correspondem.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateFullName = (name) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  if (!name.trim()) {
    return {
      valid: false,
      error: "O nome é obrigatório.",
    };
  }
  if (!regex.test(name.trim())) {
    return {
      valid: false,
      error: "Digite seu nome completo (sem números ou símbolos).",
    };
  }
  return { valid: true, error: "" };
};
