import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { ChangeDataInterceptor } from 'src/common/interceptors/change-data.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
import { ReqDataParam } from 'src/common/params/req-data-param.decorator';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';
import { RegexProtocol } from 'src/common/regex/regex.protocol';

@Controller('recados')
@UseInterceptors(ChangeDataInterceptor, AuthTokenInterceptor)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  // @UseInterceptors(AddHeaderInterceptor)
  // @UseInterceptors(TimingConnectionInterceptor)
  findAll(
    @Query() pagination: PaginationDto,
    @ReqDataParam('url') url: string,
  ) {
  
    return this.recadosService.findAll(pagination);
  }

  @Get(':id')
  @UseInterceptors(ErrorHandlingInterceptor)
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
