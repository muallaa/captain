import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CourseStatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredStatuses = this.reflector.get<string[]>('course_statuses', context.getHandler());
    if (!requiredStatuses) {
      return true; // No status restriction
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'];

    if (!user || !requiredStatuses.includes(user.course_status)) {
      throw new ForbiddenException(`Requires course status: ${requiredStatuses.join(', ')}`);
    }

    return true;
  }
}