import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    if (id === 'current') {
      if (req?.user?.id) {
        return this.userService.findOne(req.user.id, true);
      }
      res.status(401);
      return null;
    }
    return this.userService.findOne(+id);
  }
}
