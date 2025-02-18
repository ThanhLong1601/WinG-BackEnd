import { checkUserLogin } from './auth.service';
import { Body, Res } from 'routing-controllers';
import { Response, Request } from 'express';


// export default class AuthController {
//   async login(@Res() res: Response, @Body() body: any) {
   
//     const result = await checkUserLogin(body);
//     return res.status(200).json(result);
//   }

//   test(req: Request, res: Response) {
//     return res.status(200).json({message: 'Hello World'});
//   }
// }

export const login = async (req: Request, res: Response): Promise<void> => {
  // your login logic here
  res.status(200).json({message: 'Hello World'});
};