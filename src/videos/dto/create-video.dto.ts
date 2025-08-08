import { IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateVideoDto {

        @IsString()
        title : string
        
        @IsOptional()
        video_url : any;
    
        @Column()
        type : string;
}
