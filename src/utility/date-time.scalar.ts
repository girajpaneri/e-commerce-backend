import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime', () => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = 'DateTime custom scalar type';

  parseValue(value: string): Date {
    console.log('parseValue:', value);
    return new Date(value);
  }

  serialize(value: Date): string {
    console.log('serialize:', value);
    if (!(value instanceof Date)) {
      throw new Error('Expected a Date object');
    }
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date | null {
    console.log('parseLiteral:', ast);
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
