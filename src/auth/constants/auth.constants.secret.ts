export const jwtConstants = {
  secret: process.env.SECRET_JWT,
};

if (!jwtConstants.secret) {
  throw new Error('A variável de ambiente SECRET_JWT não está definida.');
}
