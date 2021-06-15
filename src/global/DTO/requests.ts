import { ApiProperty } from '@nestjs/swagger';

export class SetTokenRequest {
  @ApiProperty()
  token: string;
}