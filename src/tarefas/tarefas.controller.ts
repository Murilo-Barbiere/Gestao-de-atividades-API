import { Body, Controller, Get, Post } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarafaDto } from './dto/createTarafa.dto';

@Controller('tarefas')
export class TarefasController {
    constructor(private tarefasService: TarefasService){}

    @Post()
    postTarefa(@Body() createTarafa: CreateTarafaDto){
        this.tarefasService.addNewTarefa(createTarafa);
    }

    @Get("all")
    getAll(){
        return this.tarefasService.listAll();
    }

}