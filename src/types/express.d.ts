import { User } from '../users/entities/user.entity'; // path to your user entity

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
