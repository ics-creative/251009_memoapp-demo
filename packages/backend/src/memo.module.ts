import { Module } from "@nestjs/common";
import { MemoController } from "./memo.controller";
import { MemoService } from "./memo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Memo } from "../db/memo.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.DATABASE_PATH,
      entities: [Memo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Memo]),
  ],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
