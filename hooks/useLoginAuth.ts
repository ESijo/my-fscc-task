export type UserData = {
  email: string;
  password: string;
};

export const login = async (data: UserData) => {
  const response = await fetch(`https://auth-fscc.free.beeceptor.com/auth`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.status;
};
