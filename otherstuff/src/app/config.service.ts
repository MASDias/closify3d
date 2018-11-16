import {Injectable} from '@angular/core';


@Injectable()
export class ConfigService {
  autoRotate = true;
  autoRotateMode: 'random' | 'diagonal' = 'random';
  isStereo = false;
  rotation = {
    x: 0,
    y: 0,
    z: 0,
  };
}
