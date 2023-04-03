import bcrypt from "bcryptjs";

export class PassWordUtils {
  static encryptPassword = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(12));

  static comparePasswords = (rawPass: string, dbPass: string) =>
    bcrypt.compareSync(rawPass, dbPass);
}
