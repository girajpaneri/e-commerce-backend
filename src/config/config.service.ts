// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {

    const env_str = process.env.NODE_ENV == 'test' ? '_TEST' : '';

    if (process.env.DATABASE_URL) {
      return {
        url: process.env.DATABASE_URL,
        type: 'mysql',
        ssl: {
          rejectUnauthorized: false,
        },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        autoLoadEntities: true,
      }
    }

    return {
      type: 'mysql',
      host: this.getValue(`DB_HOST${env_str}`),
      port: parseInt(this.getValue(`DB_PORT${env_str}`)),
      username: this.getValue(`DB_USERNAME${env_str}`),
      password: this.getValue(`DB_PASSWORD${env_str}`),
      database: this.getValue(`DB_NAME${env_str}`),

      entities: ['**/*.entity{.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      synchronize: true,

      logging: true,
      ssl: false,
      autoLoadEntities: true
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
  ]);

export { configService };
