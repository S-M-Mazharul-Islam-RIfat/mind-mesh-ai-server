import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
declare const auth: (...requiredRoles: TUserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
export default auth;
//# sourceMappingURL=auth.d.ts.map