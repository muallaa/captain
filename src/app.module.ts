import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ExerciseVideosModule } from './exercise_videos/exercise_videos.module';
import { NutritionPlansModule } from './nutrition_plans/nutrition_plans.module';
import { PasswordResetCodesModule } from './password_reset_codes/password_reset_codes.module';
import { SubscriptionPackagesModule } from './subscription_packages/subscription_packages.module';
import { SupplementPlansModule } from './supplement_plans/supplement_plans.module';
import { UserBodyPicturesModule } from './user_body_pictures/user_body_pictures.module';
import { UserSubscriptionsModule } from './user_subscriptions/user_subscriptions.module';
import { WorkoutProgramsModule } from './workout_programs/workout_programs.module';
import { CoachCommunicationsModule } from './coach_communications/coach_communications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { CoachCommunication } from './coach_communications/entities/coach_communication.entity';
import { ExerciseVideo } from './exercise_videos/entities/exercise_video.entity';
import { Exercise } from './exercises/entities/exercise.entity';
import { NutritionPlan } from './nutrition_plans/entities/nutrition_plan.entity';
import { PasswordResetCode } from './password_reset_codes/entities/password_reset_code.entity';
import { SubscriptionPackage } from './subscription_packages/entities/subscription_package.entity';
import { SupplementPlan } from './supplement_plans/entities/supplement_plan.entity';
import { UserBodyPicture } from './user_body_pictures/entities/user_body_picture.entity';
import { UserSubscription } from './user_subscriptions/entities/user_subscription.entity';
import { WorkoutProgram } from './workout_programs/entities/workout_program.entity';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './user/entities/refresh-token.entity';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration]
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configuration) => ({
        secret: configuration.get('jwt.secret'),
        // secret: '123',
        signOptions: { expiresIn: '60m' },
       
      }),
      global : true,
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABSE'),
        entities: [User, RefreshToken, CoachCommunication, ExerciseVideo, Exercise, NutritionPlan, PasswordResetCode, SubscriptionPackage, SupplementPlan, UserBodyPicture, UserSubscription, WorkoutProgram],
        synchronize: true
      }),
      inject: [ConfigService]
    }),

    UserModule, ExercisesModule, ExerciseVideosModule, NutritionPlansModule, PasswordResetCodesModule, SubscriptionPackagesModule, SupplementPlansModule, UserBodyPicturesModule, UserSubscriptionsModule, WorkoutProgramsModule, CoachCommunicationsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
